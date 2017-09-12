;(function($) {

  if(typeof(jQuery) == 'undefined') {
    console.warn('fuzzyComplete plugin requires jQuery');
    return;
  }

  if(typeof(Fuse) == 'undefined') {
    console.warn('fuzzyComplete plugin requires Fuse.js');
    return;
  }

  $.fn.fuzzyComplete = function(jsonData, options) {

    return this.each(function() {

      // Default options: search all keys, display and output the first one
      if(typeof options === 'undefined') {
        options = {
          display: Object.keys(jsonData[0])[0],
          key: Object.keys(jsonData[0])[0],
          resultsLimit: 4,
          fuseOptions:
            {
              keys: Object.keys(jsonData[0])
            }
        };
      }

      var f = new Fuse(jsonData, options.fuseOptions);
      var searchBox = $(this);
      var resultsBox = $('<div>').addClass('fuzzyResults');
      searchBox.after(resultsBox);
      var selectBox = $('<select>').attr('name', searchBox.attr('name')).hide();
      searchBox.after(selectBox);
      searchBox.removeAttr('name');

      var pos = searchBox.position();
      pos.left += parseInt(searchBox.css('marginLeft'), 10);
      pos.top += parseInt(searchBox.css('marginTop'), 10);
      resultsBox.css({
        'left': pos.left,
        'top': pos.top + searchBox.outerHeight(),
        'width': searchBox.outerWidth()
      });

      function selectCurrent() {
        selectBox.val(resultsBox.children('.selected').first().data('id'));
        searchBox.val(resultsBox.children('.selected').first().text());
      }

      searchBox.keydown(function(e) {
        switch(e.which) {
          case 13: // Enter
            e.preventDefault();
            resultsBox.hide();
            selectCurrent();
            return;
          case 9: // Tab
            resultsBox.hide();
            selectCurrent();
            return;
        }
      });

      searchBox.keyup(function(e) {
        switch(e.which) {
          case 38:  // up arrow
            var selitem = resultsBox.find('.selected').first();

            if(selitem.length) {
              selitem.removeClass('selected');
              if(selitem.prev().length)
                selitem.prev().addClass('selected');
              else
                resultsBox.children().last().addClass('selected');
            } else {
              resultsBox.children().last().addClass('selected');
            }
            selectCurrent();
            return;
          case 40: // down arrow
            var selitem = resultsBox.find('.selected').first();

            if(selitem.length) {
              selitem.removeClass('selected');
              if(selitem.next().length)
                selitem.next().addClass('selected');
              else
                resultsBox.children().first().addClass('selected');
            } else {
              resultsBox.children().first().addClass('selected');
            }
            selectCurrent();
            return;
          case 13: // Enter
            return;
        }

        var results = f.search($(this).val());

        resultsBox.empty();

        if(results.length === 0) {
          selectBox.val(null);
        }

        results.forEach(function(result, i) {
          if(i >= options.resultsLimit)
            return;

          if(i === 0)
            selectBox.val(result.id);

          resultsBox.append(
            $('<div>')
              .text(result[options.display])
              .data('id', result[options.key])
              .addClass('__autoitem')
              .on('mousedown', function(e) {
                e.preventDefault(); // This prevents the element from being hidden by .blur before it's clicked
              })
              .click(function() {
                resultsBox.find('.selected').removeClass('selected');
                $(this).addClass('selected');
                selectCurrent();
                resultsBox.hide();
              })
          );

        });

        if(resultsBox.children().length) {
          resultsBox.show();
          resultsBox.children().first().addClass('selected');
        } else {
          resultsBox.hide();
        }
      });

      searchBox.blur(function() {
        resultsBox.hide();
      });

      searchBox.focus(function() {
        if(resultsBox.children().length) {
          resultsBox.show();
        }
      });

      selectBox.append($('<option>', {
        value: '',
        text: '(None Selected)'
      }));

      jsonData.forEach(function(entry, i) {
        selectBox.append($('<option>', {
          value: entry[options.key],
          text: entry[options.display]
        }));

      });

      if(searchBox.val()) {
        searchBox.keyup();
        searchBox.blur();
      }

    });

  };

}(jQuery));
