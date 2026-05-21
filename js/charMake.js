window.addEventListener('DOMContentLoaded', () => {

  document.getElementById('createCheckboxBtn').addEventListener('click', () => {
    const nameInput = document.getElementById('characterName');
    const fileInput = document.getElementById('characterIcon');
    const container = document.getElementById('characterCheckbox');

    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
      return;
    }

    let imageUrl = "";
    if (fileInput.files && fileInput.files.length > 0) {
      const imageFile = fileInput.files[0];
      imageUrl = URL.createObjectURL(imageFile);
    }

    const label = document.createElement('label');
    label.className = 'character-label-row';

    const leftGroup = document.createElement('div');
    leftGroup.className = 'character-left-group';

    const rightGroup = document.createElement('div');
    rightGroup.className = 'character-right-group';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'character-checkbox';
    checkbox.dataset.charName = nameValue;
    checkbox.dataset.charIcon = imageUrl;


    checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        const allBoxes = document.querySelectorAll('.character-checkbox');
        allBoxes.forEach(box => {
          if (box !== event.target) {
            box.checked = false;
          }
        });
      }
    });

    leftGroup.appendChild(checkbox);

    if (imageUrl !== "") {
      const miniIcon = document.createElement('img');
      miniIcon.src = imageUrl;
      miniIcon.className = 'miniIcon';
      leftGroup.appendChild(miniIcon);;
    }

    const textSpan = document.createElement('span');
    textSpan.textContent = nameValue;
    leftGroup.appendChild(textSpan);


    const uniqueId = `char-${Date.now()}`;
    checkbox.dataset.charId = uniqueId;

    const alignWrap = document.createElement('div');
    alignWrap.className = 'rlRadio';

    const leftRadio = document.createElement('input');
    leftRadio.type = 'radio';
    leftRadio.name = `align-${uniqueId}`;
    leftRadio.checked = true;
    leftRadio.addEventListener('change', () => {
      checkbox.dataset.align = 'left';
      document.querySelectorAll(`.card-grp-${uniqueId}`).forEach(card => {
        card.classList.remove('align-right');
      });
    });

    const rightRadio = document.createElement('input');
    rightRadio.type = 'radio';
    rightRadio.name = `align-${uniqueId}`;
    rightRadio.addEventListener('change', () => {
      checkbox.dataset.align = 'right';
      document.querySelectorAll(`.card-grp-${uniqueId}`).forEach(card => {
        card.classList.add('align-right');
      });
    });

    alignWrap.appendChild(leftRadio);
    alignWrap.appendChild(document.createTextNode('좌'));
    alignWrap.appendChild(rightRadio);
    alignWrap.appendChild(document.createTextNode('우'));
    rightGroup.appendChild(alignWrap);


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.type = 'button';
    deleteBtn.className = 'deleteBtn';

    deleteBtn.addEventListener('click', (event) => {
      event.preventDefault();

      if (checkbox.dataset.charIcon) {
        URL.revokeObjectURL(checkbox.dataset.charIcon);
      }

      label.remove();
    });

    rightGroup.appendChild(deleteBtn);

    label.appendChild(leftGroup);
    label.appendChild(rightGroup);

    container.appendChild(label);

    
    nameInput.value = "";
    fileInput.value = "";

    getSelectedCharactersData()
  });

  function getSelectedCharactersData() {
    const checkedBoxes = document.querySelectorAll('.character-checkbox:checked');

    checkedBoxes.forEach(cb => {
      const savedName = cb.dataset.charName;
      const savedIcon = cb.dataset.charIcon;

      console.log(`선택된 캐릭터: ${savedName}`);
      console.log(`저장된 이미지 데이터: ${savedIcon}`);
    });
  }

});
