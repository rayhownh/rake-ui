document.addEventListener('DOMContentLoaded', function() {
  var logContentElement = document.getElementById('log_content');
  
  if (logContentElement) {
    var contentUrl = logContentElement.getAttribute('data-content-url');
    
    if (contentUrl) {
      var interval;
      var isRequesting = false;
      var hasAutoLoaded = false;

      function replaceContent(content) {
        logContentElement.innerHTML = content;
      }

      interval = setInterval(function () {
        if (isRequesting) { return; }
        isRequesting = true;
        fetch(contentUrl)
          .then(function(r) { return r.json(); })
          .then(function (r) {
            replaceContent(r.rake_task_log_content);

            if (r.is_rake_task_log_finished) {
              clearInterval(interval);
              
              // Auto-load the log page when task is finished
              if (!hasAutoLoaded) {
                hasAutoLoaded = true;
                window.location.reload(); // Reload the page to show the complete log
              }
            }
            isRequesting = false;
          })
          .catch(function(err) {
            isRequesting = false;
            clearInterval(interval);
            throw(err);
          });
      }, 500);
    }
  }
});
