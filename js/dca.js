document.addEventListener("DOMContentLoaded", function() {
      const listItems = document.querySelectorAll('.list-item');
    
      listItems.forEach(item => {
        item.addEventListener('click', function() {
          listItems.forEach(item => {
            item.classList.remove('active');
          });
          this.classList.add('active');
        });
      });
    });
    