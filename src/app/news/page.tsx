"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { BsCalendarEvent } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import { useWindowSize } from "@/utils/useWindowSize";

type InstagramData = {
  caption: string;
  id: string;
  media_url: string;
  permalink: string;
  timestamp: Date;
};

const News = () => {
  const [feed, setFeed] = useState<InstagramData[]>([]);
  const windowWidth = useWindowSize().width;
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setVideoRef = (ref: any, index: any) => {
    if (ref) {
      const observer = new IntersectionObserver((entries) => {
        const isVisible = entries[0].isIntersecting;
        if (!isVisible && currentVideo === index) {
          ref.pause();
        }
      });
      observer.observe(ref);

      return () => observer.unobserve(ref);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/instagram")
      .then((res) => {
        setFeed(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching Instagram feed:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleVideoPlay = (index: any) => {
    setCurrentVideo(index);
  };

  return (
    <div
      className="pt-[15vh]"
      style={{
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
      }}
    >
      <h2 className="text-center m-auto mt-[2rem] font-cursive text-[5rem] border-detail border-b-[1px] w-fit pb-[0.5rem]">
        Nyheter
      </h2>
      <p className="w-[80%] m-auto text-center max-w-[600px] mt-[2rem] text-[1.2rem] mb-[2rem] font-secondary">
        Håll dig uppdaterad om nyheter i kenneln genom Sandras instagram!
      </p>
      {loading ? (
        <div className="flex min-h-[50dvh] items-center justify-center">
          <BeatLoader color="#324b4c" />
        </div>
      ) : (
        feed?.length > 0 &&
        feed.map((e, index) => {
          const date = new Date(e.timestamp);
          const formattedDate = date.toLocaleDateString();

          return (
            <div
              className="p-[1rem] lg:p-[5rem] w-full lg:w-[90%] max-w-[1000px] m-auto border-accent border-b-[0.5px] text-accent text-[1.3rem] font-secondary"
              key={e.id}
            >
              <div className="text-[1.2rem] text-accent font-secondary flex items-baseline gap-[0.8rem] my-[2rem] border-accent border-b-[0.5px] w-fit">
                <BsCalendarEvent
                  size={windowWidth && windowWidth > 900 ? 32 : 20}
                />
                <p
                  className="mb-[0.3rem] leading-[1.8rem] tracking-[0.03rem] max-w-[80ch] text-[1rem]"
                  style={{ wordWrap: "break-word" }}
                >
                  {formattedDate}
                </p>
              </div>
              <p
                className="mb-[2rem] leading-[1.8rem] tracking-[0.03rem] max-w-[80ch] text-[1rem]"
                style={{ wordWrap: "break-word" }}
              >
                {e.caption}
              </p>
              {e.media_url.includes("mp4") ? (
                <video
                  controls
                  ref={(ref) => setVideoRef(ref, index)}
                  onPlay={() => handleVideoPlay(index)}
                  onPause={() => setCurrentVideo(null)}
                  onEnded={() => setCurrentVideo(null)}
                  preload="metadata"
                  className="max-w-full w-full mt-[1rem] max-h-[50vh]"
                >
                  <source src={`${e.media_url}#t=0.001`} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={e.media_url}
                  className="max-w-full max-h-[50vh]"
                  style={{
                    boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
                  }}
                />
              )}
              <p className="flex items-center gap-[0.5rem]">
                <a
                  className="text-accent no-underline my-[1rem] font-primary text-[1rem]"
                  href={e.permalink}
                  target="_blank"
                >
                  Gå till inlägget
                </a>
                <FiExternalLink />
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default News;
