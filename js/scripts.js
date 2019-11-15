var albumRepository = (function() {
  var repository = [];
  var apiUrl =
    "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=d72e416c1c113e2d767301436f61b6a2&format=json";

  function add(album) {
    if (typeof album === "object" && "name" in album && "detailsUrl" in album) {
      repository.push(album);
    } else {
      console.log("add an object");
    }
  }

  function addListItem(album) {
    var albumList = $(".album-list");
    var $listItem = $("<li>");
    var $button = $('<button class="my-class">' + album.name + "</button>");
    $(button).text(album.name);
    $(listitem).append(button);
    button.on("click", function() {
      showDetails(album);
    });
  }

  function showDetails(item) {
    albumRepository.loadDetails(item).then(function() {
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
          var album = {
            name: item.name,
            detailsUrl: item.url
          };
          add(album);
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
        item.name = details.name;
        item.artist = details.artist;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showModal(item) {
    var $modalContainer = $("#modal-container");
    $modalContainer.empty();
    var modal = $('<div class="modal"></div>');
    var closeButtonElement = $('<button class="modal-close">Close</button>');
    $("#Name").text(item.name);
    $("#Img").attr("png", item.imageUrl);
    $("#Artist").text(item.artist);
  }

  function hideModal() {
    var $modalContainer = $("#modal-container");
    $modalContainer.removeClass("is-visible");
  }

  jQuery(window).on("keydown", e => {
    var $modalContainer = $("#modal-container");
    if (e.key === "Escape" && $modalContainer.hasClass("is-visible")) {
      hideModal();
    }
  });

  var $modalContainer = document.querySelector("#modal-container");
  $modalContainer.addEventListener("click", e => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

// forEach Used To cycle through addListItem function properties
albumRepository.loadList().then(function() {
  // Now the data is loaded
  albumRepository.getAll().forEach(function(album) {
    albumRepository.addListItem(album);
  });
});
