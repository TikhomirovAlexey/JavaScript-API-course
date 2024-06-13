'use strict';
const scheduleTable = document.querySelector('.schedule-table');

const userRegistredFlag = {};

function getDateForUserRegistredFlag() {
    const data = JSON.parse(traningData);
    data.forEach(el => {
        userRegistredFlag[el.name] = false;
    });
}

function displayTraningInfo() {
    const data = JSON.parse(traningData);
    scheduleTable.innerHTML = `
                <div class="schedule-table-row">
                    <div class="schedule-table-element">Название занятия</div>
                    <div class="schedule-table-element">Время проведения</div>
                    <div class="schedule-table-element">Максимальное кол-во участников</div>
                    <div class="schedule-table-element">Кол-во записанных участников</div>
                </div>`;
    data.forEach(element => {
        let tmpString = `                    
                <div class="schedule-table-row" data-id="${element.name}">
                    <div class="schedule-table-element">${element.name}</div>
                    <div class="schedule-table-element">${element.time}</div>
                    <div class="schedule-table-element">${element.maxPersons}</div>
                    <div class="schedule-table-element schedule-table-element-add">
                        ${element.personRegistered}
                `;


        if (element.personRegistered < 20 && !(userRegistredFlag[element.name])) {
            tmpString += `   
                        <button class="button button-add">Записаться</button>
                    </div>
                </div>
                `;
        }

        if (element.personRegistered <= 20 && userRegistredFlag[element.name]) {
            tmpString += `
                            <button class="button button-cancel">Отменить</button>
                        </div>
                    </div>
                `;
        }

        if (element.personRegistered == 20 && !(userRegistredFlag[element.name])) {
            tmpString += `
                            <p class="schedule-table-element-add-info">Макс. запись</p>
                        </div>
                    </div>
                `;
        }
        scheduleTable.insertAdjacentHTML('beforeend', tmpString);
    });
}

scheduleTable.addEventListener('click', event => {
    const data = JSON.parse(traningData);
    if (event.target.classList.contains('button-add')) {
        const parentEl = event.target.closest('.schedule-table-row');
        data.forEach(el => {
            if (el.name == parentEl.dataset.id && !(userRegistredFlag[parentEl.dataset.id])) {
                if (el.personRegistered < 20) {
                    el.personRegistered++;
                    userRegistredFlag[parentEl.dataset.id] = true;
                }
            }
        });
    }
    if (event.target.classList.contains('button-cancel')) {
        const parentEl = event.target.closest('.schedule-table-row');
        data.forEach(el => {
            if (el.name == parentEl.dataset.id) {
                el.personRegistered--;
                userRegistredFlag[parentEl.dataset.id] = false;
            }
        });
    }
    traningData = JSON.stringify(data);
    displayTraningInfo();
});

getDateForUserRegistredFlag();
displayTraningInfo();