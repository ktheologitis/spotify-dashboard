import React from "react";
import IconButton from "../../components/IconButton/IconButton";
import SongCard from "../../components/SongCard/SongCard";
import { IconButtonStyles } from "../../lib/enums";
import filterIcon from "../../static/icons/filter.svg";
import "./recommendations-page.scss";

const RecommendationsPage = () => {
  const songData: { name: string; imgSrc: string }[] = [
    { name: "Dino", imgSrc: "" },
    { name: "Niko", imgSrc: "" },
    { name: "Deaf Radio", imgSrc: "" },
    { name: "Rattler Proxy", imgSrc: "" },
  ];

  const songs = (
    <>
      {songData.map((data) => {
        return (
          <React.Fragment key={data.name}>
            <SongCard
              imgSrc={data.imgSrc}
              name={data.name}
              album={data.name}
            />
          </React.Fragment>
        );
      })}
    </>
  );

  return (
    <main className="recommendations-page">
      <header>
        <h1 className="recommendations-page__title">
          Recommendations
        </h1>
      </header>
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-7 mt-5">
        {songs}
      </section>
      <section className="filter-icon-button">
        <IconButton
          iconSrc={filterIcon}
          style={IconButtonStyles.Primary}
        />
      </section>
    </main>
  );
};

export default RecommendationsPage;
