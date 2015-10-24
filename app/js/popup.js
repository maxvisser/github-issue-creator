(function() {
  $(function() {
    var fields;
    fields = ['repositories', 'title', 'labels', 'assignee', 'milestone', 'body'];
    return chrome.storage.local.get(fields, function(config) {
      var repositories;
      repositories = config.repositories.split('\n');
      $.each(repositories, function(i, repo) {
        var href;
        href = "https://github.com/" + repo + "/issues/new";
        href += "?title=" + config.title + "&labels=" + config.labels + "&assignee=" + config.assignee + "&milestone=" + config.milestone + "&body=" + config.body;
        return $('#repositories').append("<a href='" + href + "' class='list-group-item'>" + repo + "</a>");
      });
      return $('#repositories a').click(function(e) {
        var repoLocation;
        e.preventDefault();
        repoLocation = $(e.currentTarget).attr('href');
        return chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function(tabs) {
          if (tabs.length) {
            return chrome.tabs.update(tabs[0].id, {
              url: repoLocation
            });
          } else {
            return chrome.tabs.create({
              url: repoLocation
            });
          }
        });
      });
    });
  });

}).call(this);