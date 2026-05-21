window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('submitContentBtn').addEventListener('click', () => {
        const contentInput = document.getElementById('contentInput');
        const result = document.getElementById('result');

        const targetCheckbox = document.querySelector('.character-checkbox:checked');
        const textValue = contentInput.value.trim();

        if (!targetCheckbox) {
            return;
        }
        if (textValue === "") {
            return;
        }

        const charName = targetCheckbox.dataset.charName;
        const charIcon = targetCheckbox.dataset.charIcon; // 이미지가 없으면 ""
        const alignMode = targetCheckbox.dataset.align;
        const charId = targetCheckbox.dataset.charId;

        const cardDiv = document.createElement('div');
    cardDiv.className = `box card-grp-${charId}`;
    if (alignMode === 'right') {
      cardDiv.classList.add('align-right');
    }

    cardDiv.innerHTML = `
      ${charIcon ? `<img class="icon" src="${charIcon}" style="width: 45px; height: 45px;">` : '<div class="icon" style="width: 45px;"></div>'}
      <div class="content">
        <strong class="name">${charName}</strong>
        <div class="text">${textValue}</div>
      </div>
    `;

    const boxDeleteBtn = document.createElement('button');
    boxDeleteBtn.type = 'button';
    boxDeleteBtn.className = 'boxDeleteBtn';
    boxDeleteBtn.textContent = 'X';

    boxDeleteBtn.addEventListener('click', () => {
      cardDiv.remove();
    });

    cardDiv.appendChild(boxDeleteBtn);
    result.appendChild(cardDiv);

        result.scrollTop = result.scrollHeight;

        contentInput.value = "";
        contentInput.style.height = 'auto';
    });

});