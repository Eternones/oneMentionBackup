window.addEventListener('DOMContentLoaded', () => {

    const convertImageToBase64 = (imgUrl) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                const canvas = document.createElement('canvas');

                const targetSize = 250;
                canvas.width = targetSize;
                canvas.height = targetSize;
                const ctx = canvas.getContext('2d');

                let srcX = 0, srcY = 0, srcWidth = this.width, srcHeight = this.height;
                if (this.width > this.height) {
                    srcWidth = this.height;
                    srcX = (this.width - this.height) / 2;
                } else if (this.height > this.width) {
                    srcHeight = this.width;
                    srcY = (this.height - this.width) / 2;
                }

                ctx.drawImage(this, srcX, srcY, srcWidth, srcHeight, 0, 0, targetSize, targetSize);

                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            };
            img.onerror = reject;
            img.src = imgUrl;
        });
    };

    window.getExtractedCSS = () => {
        let extractedCSS = "";
        try {
            const targetKeywords = ['.box', '.icon', '.content', '.name', '.text', 'align-right'];
            for (let sheet of document.styleSheets) {
                try {
                    const rules = sheet.cssRules || sheet.rules;
                    if (!rules) continue;
                    for (let rule of rules) {
                        if (rule.type === CSSRule.STYLE_RULE) {
                            const hasKeyword = targetKeywords.some(keyword => rule.selectorText.includes(keyword));
                            if (hasKeyword) { extractedCSS += rule.cssText + "\n  "; }
                        }
                    }
                } catch (e) { console.warn("일부 외부 스타일시트 제외:", e); }
            }
        } catch (err) { console.error("CSS 추출 에러:", err); }

        if (!extractedCSS.trim()) {
            extractedCSS = `/* CSS 미검출: 기본 틀 제공 */\n  #result { width: 100%; display: flex; flex-direction: column; gap: 12px; }`;
        }

        const customDefaultCSS = `
        div {
            position: relative;
            background-color: rgb(250, 250, 250);
            border-radius: 5px;
            padding: 0 10px;
        }
        `
        return `<style>\n  ${extractedCSS.trim()}\n  ${customDefaultCSS.trim()}\n</style>\n`;
    };

    window.processCleanHTML = async (resultBox) => {
        const tempContainer = resultBox.cloneNode(true);
        const deleteButtons = tempContainer.querySelectorAll('.boxDeleteBtn');
        deleteButtons.forEach(btn => btn.remove());

        const imagesToConvert = tempContainer.querySelectorAll('img.icon');
        const conversionPromises = [];

        imagesToConvert.forEach(img => {
            if (img.src && img.src.startsWith('blob:')) {
                const promise = convertImageToBase64(img.src)
                    .then(base64Data => { img.src = base64Data; })
                    .catch(err => { console.error("이미지 변환 실패:", img.src, err); });
                conversionPromises.push(promise);
            }
        });

        await Promise.all(conversionPromises);
        return tempContainer.innerHTML.trim();
    };

    const htmlCopyBtn = document.getElementById('htmlCopy');
    if (htmlCopyBtn) {
        htmlCopyBtn.addEventListener('click', async () => {
            const resultBox = document.getElementById('result');
            if (!resultBox || resultBox.children.length === 0) {
                return;
            }

            const finalStyleTag = getExtractedCSS();
            const cleanHTML = await processCleanHTML(resultBox);
            const finalOutput = finalStyleTag + cleanHTML;

            try {
                await navigator.clipboard.writeText(finalOutput);
                alert("클립보드에 복사되었습니다.");
            } catch (err) {
                console.error("클립보드 복사 실패: ", err);
                alert("복사에 실패했습니다. 브라우저 권한을 확인해 주세요.");
            }
        });
    }

});