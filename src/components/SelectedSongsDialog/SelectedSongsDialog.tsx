import React from "react";
import { FilterState } from "../../hooks/useFilter";
import { ButtonStyles } from "../../lib/enums";
import { Song, SongsFilter } from "../../lib/types";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import SongCard from "../SongCard/SongCard";
import "./selected-songs-dialog.scss";

const SelectedArtistsDialog = ({
  isOpen,
  title,
  songsFilter,
  handleSongCardClick,
  closeDialog,
}: {
  isOpen: boolean;
  title?: string;
  songsFilter?: FilterState<SongsFilter | null>;
  handleSongCardClick: (selectedSong: Song) => void;
  closeDialog: () => void;
}) => {
  const mainContent = (
    <div className="selected-songs">
      {songsFilter?.filter?.data &&
        songsFilter.filter.data.map((song) => {
          return (
            <React.Fragment key={song.id}>
              <SongCard
                id={song.id}
                images={song.album.images}
                album={song.album.name}
                name={song.name}
                songsFilter={songsFilter.filter}
                handleClick={() => {
                  handleSongCardClick(song);
                }}
              />
            </React.Fragment>
          );
        })}
    </div>
  );

  const primaryButton = (
    <Button
      label="Close"
      style={ButtonStyles.Primary}
      handleClick={closeDialog}
    />
  );

  return (
    <Dialog
      isOpen={isOpen}
      title={title}
      mainContent={mainContent}
      primaryButton={primaryButton}
    ></Dialog>
  );
};

export default SelectedArtistsDialog;
