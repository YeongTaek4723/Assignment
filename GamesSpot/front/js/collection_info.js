const items = document.querySelectorAll('.item');
const loadMoreButton = document.getElementById('loadMore');
const itemsPerLoad = 5;
let visibleItems = itemsPerLoad;

function showItems() {
  for (let i = 0; i < items.length; i++) {
    if (i < visibleItems) {
      items[i].style.display = 'block';
    } else {
      items[i].style.display = 'none';
    }
  }

  if (visibleItems >= items.length) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }
}

loadMoreButton.addEventListener('click', () => {
  visibleItems += itemsPerLoad;
  showItems();
});

showItems();


const comments = document.querySelectorAll('.comment');
const loadMorecomments = document.getElementById('loadMoreComment');
const commentPerLoad = 5;
let visibleComment = commentPerLoad;

function showComments() {
  for (let i = 0; i < comments.length; i++) {
    if (i < visibleComment) {
      comments[i].style.display = 'block';
    } else {
      comments[i].style.display = 'none';
    }
  }

  if (visibleComment >= comments.length) {
    loadMorecomments.style.display = 'none';
  } else {
    loadMorecomments.style.display = 'block';
  }
}

loadMorecomments.addEventListener('click', () => {
  visibleComment += commentPerLoad;
  showComments();
});

showComments();
