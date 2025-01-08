const refs = {
   wordProcessingForm: document.querySelector('[data-word-processing-form]'),
   result: document.querySelector('[data-result]'),
   reset: document.querySelector('[data-reset]'),
};

refs.wordProcessingForm.addEventListener('submit', onSubmit);
refs.reset.addEventListener('click', onReset);
// refs.textarea.addEventListener('');

function onSubmit(e) {
   e.preventDefault();
   const form = [{}];
   const formData = new FormData(e.currentTarget);

   let processedText = '';

   for (const [key, value] of formData) {
      form[0][key] = value;
   }

   const arr = form[0].exampleText.split(' ');

   if (arr.length === 1) {
      processedText = shuffleSyllables(arr[0]);
   } else {
      console.log('else  arr:', arr);
      processedText = arr.map((el) => {
         return shuffleSyllables(el);
      });
   }
   refs.result.textContent = processedText.join(' ');

   // e.currentTarget.reset();
}

function shuffleSyllables(word) {
   let syllables = '';

   if (word.length <= 4) {
      syllables = shuffleWord(word);
   } else {
      syllables = shuffleArray(splitIntoSyllables(word));
   }

   return syllables;
}

// ====================склади========================
function splitIntoSyllables(word) {
   // Простий алгоритм для поділу на склади (можна покращити для складних випадків)
   return word.match(/[аеиоуяюіїєь]*[^аеиоуяюіїєь]*/gi).filter(Boolean);
}

// =================літери===============
function shuffleWord(word) {
   // Перетворюємо слово на масив літер
   let letters = word.split('');

   // Алгоритм Фішера-Йетса для перемішування
   for (let i = letters.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // Випадковий індекс від 0 до i
      [letters[i], letters[j]] = [letters[j], letters[i]]; // Обмін елементами
   }

   // Перетворюємо масив назад у строку
   return letters.join('');
}

// Перемішуємо склади
function shuffleArray(array) {
   // Алгоритм Фішера-Йетса для перемішування
   for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }

   return array.join('');
}

function onReset() {
   refs.result.textContent = '...';
}
