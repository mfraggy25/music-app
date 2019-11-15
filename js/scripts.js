var musicRepository = (function() {
  var repository = [];
  var apiUrl =
    "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=d72e416c1c113e2d767301436f61b6a2&format=json";

  function add(music) {
    if (typeof music === "object" && "name" in music && "detailsUrl" in music) {
      repository.push(music);
    } else {
      console.log("add an object");
    }
  }

  function addListItem(music) {
    var musicList = $(".music-list");
    var $listItem = $("<li>");
    var $button = $('<button class="my-class">' + music.name + "</button>");
    $(button).text(music.name);
    $(listitem).append(button);
    button.on("click", function() {
      showDetails(music);
    });
  }

  function showDetails(item) {
    musicRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }
  function add(name) {
    repository.push(name);
  }

  function getAll() {
    return repository;
  }

  function loadList() {
    return $.ajax(apiUrl, { dataType: "json" })
      .then(function(item) {
        $.each(item.results, function(index, item) {
          var music = {
            name: item.name,
            detailsUrl: item.url
          };
          add(music);
        });
      })
      .catch(function(error) {
        document.write(error);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.name = details.height;
        item.artist = details.artist;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showModal(item) {
    $("#Name").text(item.name);
    $("#Img").attr("png", item.imageUrl);
    $("#Artist").text(item.artist);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

// forEach Used To cycle through addListItem function properties
musicRepository.loadList().then(function() {
  // Now the data is loaded
  musicRepository.getAll().forEach(function(music) {
    musicRepository.addListItem(music);
  });
});
