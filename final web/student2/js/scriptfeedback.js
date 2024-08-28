document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('feedbackForm').style.display = 'none';
});

function previewForm() {
    const form = document.getElementById('feedbackForm');
    const previewContent = document.getElementById('previewContent');
    if (!form || !previewContent) return;

    let previewHTML = '';
    new FormData(form).forEach((value, key) => {
        previewHTML += `
            <div class="preview-item" data-key="${key}">
                <p><strong>${key}:</strong> <span class="value">${value}</span></p>
                <button type="button" onclick="editPreviewItem('${key}', '${value}')">Edit</button>
                <p class="error-message" style="color: red; display: none;"></p>
            </div>
        `;
    });

    previewContent.innerHTML = previewHTML;
    document.getElementById('previewContainer').style.display = 'block';
}

function editPreviewItem(key, value) {
    const previewItem = document.querySelector(`.preview-item[data-key="${key}"] .value`);
    if (previewItem) {
        previewItem.innerHTML = `
            <input type="text" value="${value}" id="edit-${key}" />
            <button type="button" onclick="savePreviewItem('${key}')">Save</button>
        `;
    }
}

function savePreviewItem(key) {
    const newValue = document.getElementById(`edit-${key}`).value.trim();
    const previewItem = document.querySelector(`.preview-item[data-key="${key}"]`);
    if (!newValue) return displayError(previewItem, 'This field cannot be empty.');

    updateFormAndPreview(key, newValue, previewItem);
}

function displayError(previewItem, message) {
    const errorMessage = previewItem.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}

function updateFormAndPreview(key, value, previewItem) {
    document.querySelector(`[name="${key}"]`).value = value;
    previewItem.querySelector('.value').textContent = value;
    previewItem.querySelector('.error-message').style.display = 'none';
}
