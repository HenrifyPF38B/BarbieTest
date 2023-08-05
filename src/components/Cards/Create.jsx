import style from "./Create.module.css";
import camera from "../assets/camera.svg";
import close from "../assets/remove.svg";
import React, { useState } from "react";
import { useEffect } from "react";
import back from "../assets/back.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import song from "../assets/ari.jpeg";
import add from "../assets/add.svg";
import playlist from "../assets/about2.png";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSongs,
  filterSongs,
  getSongs,
} from "../../redux/Actions/SongsActions";
import { Typeahead } from "react-bootstrap-typeahead";
import SongsPlaylist from "./UserPlaylist/songsPlaylist";
import { favsUser } from "../../redux/Actions/UsersActions";
import SongCard from "./songCard";


const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { songs, filteredSongs, userFavs } = state;

  const [optionsSearch, setOptionsSearch] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [randomSongs, setRandomSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userId = "your_user_id_here";
    dispatch(favsUser(userId));
  }, []);

  //**************SONGS - RANDOM **********/

  useEffect(() => {
    if (songs.length > 0) {
      let shuffledSongs = songs.sort(() => 0.5 - Math.random());
      let selectedRandomSongs = shuffledSongs.slice(0, 4);
      setRandomSongs(selectedRandomSongs);
    }
  }, [songs]);

  useEffect(() => {
    console.log(songs);
    let options = [];
    songs.map((el, index) => {
      options.push({
        id: el.id,
        label: el.artists[0].name + " • " + el.name,
        name: el.name,
        audioPreview: el.audioPreview,
        audioFull: el.audioFull,
        image: el.image,
        artists: el.artists,
        songId: el.songId,
        popularity: el.popularity,
        explicit: el.explicit,
      });
    });
    setOptionsSearch(options);
  }, [songs]);

  //******************************************** */

  useEffect(() => {
    document.querySelector("#camarita").addEventListener("click", (e) => {
      document.querySelector("#hiddenInput").click();
    });
    document.querySelector("#hiddenInput").addEventListener("change", (e) => {
      Array.from(e.target.files).map((file) => {
        let imageSource = URL.createObjectURL(file);
        let div = document.createElement("div");
        div.id = "imagePreview";
        div.className = "imagePreview";
        let img = document.createElement("img");
        img.src = imageSource;
        let closeButton = document.createElement("img");
        closeButton.src = close;
        closeButton.className = "closePreview";
        closeButton.addEventListener("click", (e) => {
          e.target.parentElement.remove();
        });

        div.appendChild(img);
        div.appendChild(closeButton);

        document
          .querySelector("#camarita")
          .insertAdjacentElement("beforeBegin", div);
      });
    });
  }, []);

  //***************************************************** */

  const handleAddToPlaylist = (song) => {
    if (selectedSongs.length < 20) {
      if (!selectedSongs.some((selected) => selected.id === song.id)) {
        setSelectedSongs((prevSongs) => [...prevSongs, song]);
      }
    } else {
      if (!selectedSongs.some((selected) => selected.id === song.id)) {
        setIsModalOpen(true);
      }
    }
  };

  const handleRemoveSong = (songId) => {
    setSelectedSongs((prevSongs) =>
      prevSongs.filter((selected) => selected.songId !== songId)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //********************** PAGINATION SONGS API *********** */

  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 4;

  const nextPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastSelectedSong = currentPage * songsPerPage;
  const indexOfFirstSelectedSong = indexOfLastSelectedSong - songsPerPage;
  const currentSelectedSongs = selectedSongs.slice(
    indexOfFirstSelectedSong,
    indexOfLastSelectedSong
  );
  const lastSelectedSongsPage = Math.ceil(selectedSongs.length / songsPerPage);

  // ************ PAGINATION FAVORITES **********************//
  const [favCurrentPage, setFavCurrentPage] = useState(1);
  const favSongsPerPage = 4;

  const indexOfLastFavSong = favCurrentPage * favSongsPerPage;
  const indexOfFirstFavSong = indexOfLastFavSong - favSongsPerPage;
  const currentFavSongs = userFavs.slice(
    indexOfFirstFavSong,
    indexOfLastFavSong
  );
  const lastFavSongsPage = Math.ceil(userFavs.length / favSongsPerPage);

  const favNextPage = (event) => {
    event.preventDefault();
    setFavCurrentPage((prevPage) => prevPage + 1);
  };

  const favPrevPage = (event) => {
    event.preventDefault();
    setFavCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.titu}>
          <h2 className={style.title}>Create a new playlist</h2>

        </div>
        <div
          className={style.backContainer}
          onClick={() => navigate("/myPlaylist")}
        >
          <img className={style.backImg} src={back} alt="back" />
        </div>
        <div className={style.containerCam}>
          <div className={style.camarita} id="camarita">
            <span className={style.textCamera}>Add photo</span>
            <img className={style.imgCamera} src={camera} alt="abc" />
          </div>
          <input
            type="file"
            accept="images/*"
            id="hiddenInput"
            style={{ visibility: "hidden" }}
          />
        </div>
        <div className={style.boxName}>
          <input
            className={style.input}
            type="text"
            name="name"
            placeholder=" Name..."
          ></input>
          <div className={style.favTit}>
            <h3 className={style.title2}>Your favorites songs</h3>
          </div>
          <div className={style.favorites}>
            {currentFavSongs.length > 0 &&
              songs.map((song) => {
                if (currentFavSongs.includes(song.songId)) {
                  return (
                    <div>
                      <SongCard
                        artist={song.artists.map((artist, index) => {
                          if (index === song.artists.length - 1) {
                            return artist.name;
                          } else {
                            return artist.name + " • ";
                          }
                        })}
                        song={song.name}
                        songId={song.songId}
                        id={song.id}
                        img={song.image}
                        audio={song.audioPreview}
                        audioFull={song.audioFull}
                        isFavoriteView={true}
                        handleAddToPlaylist={() => handleAddToPlaylist(song)}
                        handleRemoveSong={handleRemoveSong}
                      />
                    </div>
                  );
                }
                return null;
              })}
          </div>
          <div className={style.pagFavs}>
            <Pagination
              currentPage={favCurrentPage}
              lastPage={lastFavSongsPage}
              prevPage={favPrevPage}
              nextPage={favNextPage}
            />
          </div>
          <h3 className={style.title2}>Search by songs...</h3>
          <div className={style.searchSong}>
            <Typeahead
              placeholder="Select songs"
              onChange={(selected) => {
                if (selected.length > 0) {
                  const songSelected = optionsSearch.find(
                    (option) => option.id === selected[0].id
                  );
                  handleAddToPlaylist(songSelected);
                }
              }}
              options={optionsSearch}
            />
          </div>
          <div className={style.boxSelect}>
            <div className={style.selectedSong}>
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <div className={style.songCard} key={song.id}>
                    <SongsPlaylist
                      key={song.id}
                      artist={song.artists.map((artist, index) => {
                        if (index === song.artists.length - 1) {
                          return artist.name;
                        } else {
                          return artist.name + " • ";
                        }
                      })}
                      song={song.name}
                      songId={song.songId}
                      id={song.id}
                      img={song.image && song.image}
                      audio={song.audioPreview}
                      audioFull={song.audioFull}
                      handleRemoveSong={handleRemoveSong}
                      selectedSongs={selectedSongs}
                      setSelectedSongs={setSelectedSongs}
                      handleAddToPlaylist={() => handleAddToPlaylist(song)}
                    />
                  </div>
                ))
              ) : randomSongs.length > 0 ? (
                randomSongs.map((song) => (
                  <div className={style.songCard} key={song.id}>
                    <SongsPlaylist
                      artist={song.artists.map((artist, index) => {
                        if (index === song.artists.length - 1) {
                          return artist.name;
                        } else {
                          return artist.name + " • ";
                        }
                      })}
                      song={song.name}
                      songId={song.songId}
                      id={song.id}
                      img={song.image && song.image}
                      audio={song.audioPreview}
                      audioFull={song.audioFull}
                      handleRemoveSong={handleRemoveSong}
                      selectedSongs={selectedSongs}
                      setSelectedSongs={setSelectedSongs}
                      handleAddToPlaylist={() => handleAddToPlaylist(song)}
                    />
                  </div>
                ))
              ) : (
                <p>No songs available</p>
              )}
            </div>

            <h2 className={style.selectname}>My Playlist</h2>
            <div className={style.selectedSong}>
              {currentSelectedSongs.length > 0 ? (
                currentSelectedSongs.map((song) => (
                  <div className={style.songCard} key={song.id}>
                    <SongsPlaylist
                      artist={song.artists.map((artist, index) => {
                        if (index === song.artists.length - 1) {
                          return artist.name;
                        } else {
                          return artist.name + " • ";
                        }
                      })}
                      song={song.name}
                      songId={song.songId}
                      id={song.id}
                      img={song.image && song.image}
                      audio={song.audioPreview}
                      audioFull={song.audioFull}
                      handleRemoveSong={handleRemoveSong}
                      selectedSongs={selectedSongs}
                      setSelectedSongs={setSelectedSongs}
                      handleAddToPlaylist={() => handleAddToPlaylist(song)}
                      isInPlaylist={true}
                    />
                  </div>
                ))
              ) : (
                <p>No songs added to your playlist yet.</p>
              )}
            </div>
            <div className={style.pagination}>
              <Pagination
                currentPage={currentPage}
                lastPage={lastSelectedSongsPage}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            </div>
          </div>
        </div>
      </form>
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modalText">You've reached the limit</span>
            <p className="modalTextt">
              You can't add more than 20 songs to your playlist.
            </p>
            <button className="btnModal" onClick={() => setIsModalOpen(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
