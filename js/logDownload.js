window.addEventListener('DOMContentLoaded', () => {

    const htmlDownloadBtn = document.getElementById('htmlDownload');
    if (htmlDownloadBtn) {
        htmlDownloadBtn.addEventListener('click', async () => {
            const resultBox = document.getElementById('result');
            if (!resultBox || resultBox.children.length === 0) {
                return;
            }

            const finalStyleTag = window.getExtractedCSS();
            const cleanHTML = await window.processCleanHTML(resultBox);

            const finalOutput = `<!DOCTYPE html>
                <html lang="ko">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${Date.now()}</title>
                ${finalStyleTag.trim().replace(/\n/g, '\n  ')}
                </head>
                <body>
                <div id="result">
                    ${cleanHTML.replace(/\n/g, '\n    ')}
                </div>
                </body>
                </html>`;

            const fileBlob = new Blob([finalOutput], { type: 'text/html;charset=utf-8' });

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(fileBlob);
            downloadLink.download = `${Date.now()}.html`;

            document.body.appendChild(downloadLink);
            downloadLink.click();
            
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadLink.href);
        });
    }

});