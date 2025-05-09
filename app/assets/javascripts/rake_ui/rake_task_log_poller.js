var interval;
    var content_url = "<%= @rake_task_log_content_url %>"
    var is_requesting = false

    function replaceContent(content) {
      document.getElementById('log_content').innerHTML = content
    }

    interval = setInterval(function () {
      if (is_requesting) { return }
      is_requesting = true;
      fetch(content_url)
        .then(function(r) { return r.json() })
        .then(function (r) {
          replaceContent(r.rake_task_log_content)

          if (r.is_rake_task_log_finished) {
            clearInterval(interval)
          }
          is_requesting = false
        })
        .catch(function(err) {
          is_requesting = false
          clearInterval(interval)
          throw(err)
        })
    }, 500)