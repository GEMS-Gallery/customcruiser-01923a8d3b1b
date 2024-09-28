import { backend } from 'declarations/backend';

let currentProfileId = null;

document.getElementById('motorcycle-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const model = document.getElementById('model').value;
    const year = parseInt(document.getElementById('year').value);
    const description = document.getElementById('description').value;

    try {
        if (currentProfileId === null) {
            currentProfileId = await backend.createProfile(name, model, year, description);
        } else {
            await backend.updateProfile(currentProfileId, name, model, year, description);
        }
        await displayProfile();
        document.getElementById('profile-form').style.display = 'none';
        document.getElementById('profile-display').style.display = 'block';
        document.getElementById('parts-form').style.display = 'block';
        document.getElementById('parts-gallery').style.display = 'block';
    } catch (error) {
        console.error('Error creating/updating profile:', error);
    }
});

document.getElementById('edit-profile').addEventListener('click', () => {
    document.getElementById('profile-form').style.display = 'block';
    document.getElementById('profile-display').style.display = 'none';
});

document.getElementById('part-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('part-name').value;
    const description = document.getElementById('part-description').value;
    const imageFile = document.getElementById('part-image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const imageUrl = reader.result;
            try {
                await backend.addPart(currentProfileId, name, description, imageUrl);
                await displayParts();
                document.getElementById('part-form').reset();
            } catch (error) {
                console.error('Error adding part:', error);
            }
        };
        reader.readAsDataURL(imageFile);
    }
});

async function displayProfile() {
    try {
        const profile = await backend.getProfile(currentProfileId);
        if (profile) {
            const profileInfo = document.getElementById('profile-info');
            profileInfo.innerHTML = `
                <h3>${profile.name}'s ${profile.year} ${profile.model}</h3>
                <p>${profile.description}</p>
            `;
        }
    } catch (error) {
        console.error('Error displaying profile:', error);
    }
}

async function displayParts() {
    try {
        const parts = await backend.getPartsForProfile(currentProfileId);
        const partsContainer = document.getElementById('parts-container');
        partsContainer.innerHTML = '';
        parts.forEach(part => {
            const partElement = document.createElement('div');
            partElement.className = 'part';
            partElement.innerHTML = `
                <h4>${part.name}</h4>
                <img src="${part.imageUrl}" alt="${part.name}">
                <p>${part.description}</p>
            `;
            partsContainer.appendChild(partElement);
        });
    } catch (error) {
        console.error('Error displaying parts:', error);
    }
}
