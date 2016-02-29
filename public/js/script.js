jQuery(function() {
		$("#submitSong, #submitArtist, #submitAlbum").on("click", function(event) {
				event.preventDefault()
				if (!$("#songName").val()) return
				var url = "https://itunes.apple.com/search?term=" + $("#songName").val() + "&limit=25"
				var searchType = $(event.currentTarget).attr("id")
				var key = "&entity=";
				if (searchType == "submitSong") key += "musicTrack"
				else if (searchType == "submitArtist") key += "musicArtist"
				else if (searchType == "submitAlbum") key += "album"
				url += key
				console.log(url)
				$.ajax({
					url: url,
					dataType: "jsonp",
					success: function(data) {
						$("tbody tr").remove()
						var songArray = data.results
						console.log(songArray);
						$.each(songArray, function(index, value) {
								var artist = "<td>" + value.artistName + "</td>"
								var song = "<td>" + value.trackName + "</td>"
								var album = "<td>" + value.collectionName + "</td>"
								var purchase = "<td><a href=\"" + value.trackViewUrl + "\">Click to go to iTunes!</a></td>"
								var albumCover = "<td><img src=\"" + value.artworkUrl60 + "\"></td>"
								if (searchType == "submitArtist") {
									albumCover = "<td>None</td>"
									song = "<td>None</td>"
									purchase = "<td><a href=\""+ value.artistLinkUrl+"\">Click to go to iTunes!</a></td>"
									album = "<td>None</td>"
								} else if (searchType == "submitAlbum") {
									song = "<td>None</td>"
									purchase = "<td><a href=\""+ value.collectionViewUrl+"\">Click to go to iTunes!</a></td>"
								}
								$("tbody").append("<tr>" + albumCover + song + artist + album + purchase + "</tr>")
							}) // end each
					}
				})
			}) //end submitSong on click
	}) //end jquery wrap
