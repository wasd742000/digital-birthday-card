// Love Notes Interaction
const loveNotes = document.querySelectorAll('.hidden-notes .note');

// Create a container for the flashcards
const flashcardContainer = document.createElement('div');
flashcardContainer.style.display = 'grid';
flashcardContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
flashcardContainer.style.gap = '20px';
flashcardContainer.style.padding = '20px';
flashcardContainer.style.justifyContent = 'center';
flashcardContainer.style.alignItems = 'center';
flashcardContainer.style.marginTop = '50px';
flashcardContainer.classList.add('flashcard-container');

// Select the .hidden-notes section
const hiddenNotesSection = document.querySelector('.hidden-notes');

// Clear existing content in the .hidden-notes section
hiddenNotesSection.innerHTML = '';

// Append the flashcard container to the .hidden-notes section
hiddenNotesSection.appendChild(flashcardContainer);

// Create flashcards dynamically
loveNotes.forEach((note, index) => {
    const flashcard = document.createElement('div');
    flashcard.style.width = '150px';
    flashcard.style.height = '200px';
    flashcard.style.perspective = '1000px';
    flashcard.style.cursor = 'pointer';

    const flipCard = document.createElement('div');
    flipCard.style.width = '100%';
    flipCard.style.height = '100%';
    flipCard.style.position = 'relative';
    flipCard.style.transformStyle = 'preserve-3d';
    flipCard.style.transition = 'transform 0.6s';

    const frontFace = document.createElement('div');
    frontFace.style.position = 'absolute';
    frontFace.style.width = '100%';
    frontFace.style.height = '100%';
    frontFace.style.backfaceVisibility = 'hidden';
    frontFace.style.backgroundColor = '#f06292';
    frontFace.style.color = '#fff';
    frontFace.style.display = 'flex';
    frontFace.style.alignItems = 'center';
    frontFace.style.justifyContent = 'center';
    frontFace.style.borderRadius = '10px';
    frontFace.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    frontFace.textContent = 'Click to reveal';

    const backFace = document.createElement('div');
    backFace.style.position = 'absolute';
    backFace.style.width = '100%';
    backFace.style.height = '100%';
    backFace.style.backfaceVisibility = 'hidden';
    backFace.style.backgroundColor = '#fff';
    backFace.style.color = '#333';
    backFace.style.display = 'flex';
    backFace.style.alignItems = 'center';
    backFace.style.justifyContent = 'center';
    backFace.style.borderRadius = '10px';
    backFace.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    backFace.style.transform = 'rotateY(180deg)';
    backFace.textContent = note.getAttribute('data-message');

    flipCard.appendChild(frontFace);
    flipCard.appendChild(backFace);
    flashcard.appendChild(flipCard);
    flashcardContainer.appendChild(flashcard);

    flashcard.addEventListener('click', () => {
        flipCard.style.transform = flipCard.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });
});

// Hide the modal and its related functionality
modal.style.display = 'none';
