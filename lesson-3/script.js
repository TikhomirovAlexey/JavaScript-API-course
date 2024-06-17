'use strict';

const accessKey = 'k9P2fbQs73bxTPYrAvk4s4DTwKmd5vYLY4s_t-XP46M';
const containerPhoto = document.querySelector('.container');
let userLike = false;

const fetchPhotos = async () => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${accessKey}`);

        if (!response.ok) throw new Error('Ошибка при загрузке даных.');

        const data = await response.json();
        return data;
    } catch (error) {
        throw error
    }
}

function displayPhoto(data) {
    const likesInLocalStorage = localStorage.getItem(data.id);
    containerPhoto.insertAdjacentHTML('beforeend', `
        <div class="photo-box" id="${data.id}">
            <img src="${data.urls.small}" alt="${data.alt_description}">
            <div class="info-box">
                <p class="username">User: ${data.user?.username ?? ''}</p>
                <p class="name">
                    ${data.user?.first_name ?? ''}
                    <span class="second-name">${data.user?.last_name ?? ''}</span>
                </p>
            </div>
            <div class="like-box">
                <button class="btn-like">${userLike ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'}</button>
                <span class="count-like">${likesInLocalStorage}</span>
            </div>
        </div>
    `);
}

async function run() {
    try {
        const data = await fetchPhotos();
        localStorage.setItem(data.id, data.likes);
        displayPhoto(data);
    } catch (error) {
        containerPhoto.insertAdjacentHTML('beforeend', `<p class="error">${error}</p>`);
    }

}

containerPhoto.addEventListener('click', ({ target }) => {
    if (target.parentNode.classList.contains('btn-like')) {
        const parentEl = target.closest('.photo-box');
        let likes = Number(localStorage.getItem(parentEl.id));
        if (!userLike) {
            likes++;
            target.parentNode.innerHTML = '<i class="fa-solid fa-heart"></i>';
            userLike = true;
        } else {
            likes--;
            target.parentNode.innerHTML = '<i class="fa-regular fa-heart"></i>';
            userLike = false;
        }
        localStorage.setItem(parentEl.id, likes);
        parentEl.querySelector('.count-like').textContent = likes;

    }
});

run();
