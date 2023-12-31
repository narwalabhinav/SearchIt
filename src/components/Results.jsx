import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading'

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    getResults(`/?query=${searchTerm}&limit=20`)
  }, [searchTerm])

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case '/search':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {results?.results?.map(({ url, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-sm">{url.length > 30 ? url.substring(0, 30) : url}</p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{title}</p>
              </a>
            </div>
          ))}
        </div>
      );
    // case '/images':
    //   return 'IMAGES';
    // case '/news':
    //   return 'NEWS';
    // case '/videos':
    //   return 'VIDEOS';
    default:
      return 'ERROR';
  }
}
