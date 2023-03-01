import React from "react";
import { FilterState } from "../../hooks/useFilter";
import { ButtonStyles } from "../../lib/enums";
import { Artist, ArtistsFilter } from "../../lib/types";
import ArtistCard from "../ArtistCard/ArtistCard";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import "./selected-artists-dialog.scss";

const SelectedArtistsDialog = ({
  isOpen,
  title,
  artistsFilter,
  handleArtistCardClick,
  closeDialog,
}: {
  isOpen: boolean;
  title?: string;
  artistsFilter?: FilterState<ArtistsFilter | null>;
  handleArtistCardClick: (selectedArtist: Artist) => void;
  closeDialog: () => void;
}) => {
  const mainContent = (
    <div className="selected-artists">
      {artistsFilter?.filter?.data &&
        artistsFilter.filter.data.map((artist) => {
          return (
            <React.Fragment key={artist.id}>
              <ArtistCard
                id={artist.id}
                images={artist.images}
                name={artist.name}
                artistsFilter={artistsFilter.filter}
                handleClick={() => {
                  handleArtistCardClick(artist);
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
