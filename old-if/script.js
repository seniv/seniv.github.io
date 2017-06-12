let source = [
  {img: '1.jpg', trueAnswer: 'вул. Незалежності (Стометрівка, 100), неподалік від Стоматологічного корпусу ІФНМУ'},
  {img: '2.jpg', trueAnswer: 'вул. Галицька, Івано-Франківський Національний Медичний Університет'},
  {img: '3.jpg', trueAnswer: 'вул. Незалежності (Стометрівка, 100), неподалік від фонтану'},
  {img: '4.jpg', trueAnswer: 'хз'}
];

let imagesCount = source.length;
let currentImage;
let answers = [];
let answersCount = 0;
let trueAnswers = 0;

for (let i = 0; i < source.length; i++) {
  $('#citys').append('<option>' + source[i].trueAnswer + '</option>');
}

function showImage(i) {
  if(!source.length) return false;
  $('#image').attr('src', 'photos/if/' + source[i].img);
  currentImage = i;

  $('#count').text(imagesCount-source.length+1);
  $('#totalCount').text(imagesCount);
}

function checkAnswer(i, answer) {
  answersCount++;
  if(answer == source[i].trueAnswer) trueAnswers++;
  answers.push({
    img: source[i].img,
    answer: answer,
    trueAnswer: source[i].trueAnswer
  });
  source.splice(i, 1);

  if(!source.length) {
    end();
    return false;
  }

  showImage(Math.floor(Math.random()*source.length));
}

function end() {
  $('#answerContainer').hide();
  $('#image').hide(300);
  $('.counter').hide(300);
  $('#results').append('Ви відповіли на ' + answersCount + ' із ' + imagesCount + ' відповідей, з яких ' + trueAnswers + ' були вірними');

  for (let i = 0; i < answers.length; i++) {
    let res = (answers[i].answer == answers[i].trueAnswer) ? '<b>(Правильна)</b>' : '<b>(Неправильна)</b><br>Правильна відповідь: ' + answers[i].trueAnswer;
    $('#results').append('<hr><img src="photos/if/' + answers[i].img + '"><br>Ваша відповідь: ' + answers[i].answer + res);
  }

  $('#results').show(300);
}
//
$('#next').on('click', function () {
  let val = $('#answerInput').val();
  if(!val) return false;

  checkAnswer(currentImage, val);
  $('#answerInput').flexdatalist({
    minLength: 1,
    selectionRequired: true,
    searchContain: true
  });
});

$('#goToResults').on('click', function () {
  end();
});

showImage(Math.floor(Math.random()*source.length));

$('#answerInput').flexdatalist({
  minLength: 1,
  selectionRequired: true,
  searchContain: true
});
