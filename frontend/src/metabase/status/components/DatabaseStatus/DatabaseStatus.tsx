import React, { useState } from "react";
import { isSyncInProgress } from "metabase/lib/syncing";
import { User } from "metabase-types/api";
import Database from "metabase-lib/metadata/Database";
import useStatusVisibility from "../../hooks/use-status-visibility";
import DatabaseStatusLarge from "../DatabaseStatusLarge";
import DatabaseStatusSmall from "../DatabaseStatusSmall";

export interface DatabaseStatusProps {
  user?: User;
  databases?: Database[];
}

const DatabaseStatus = (props: DatabaseStatusProps): JSX.Element | null => {
  const databases = getDatabases(props);
  const isActive = databases.some(isSyncInProgress);
  const isVisible = useStatusVisibility(isActive);

  if (isVisible) {
    return <DatabaseStatusContent databases={databases} />;
  } else {
    return null;
  }
};

const DatabaseStatusContent = ({
  databases = [],
}: DatabaseStatusProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(true);

  return isExpanded ? (
    <DatabaseStatusLarge
      databases={databases}
      onCollapse={() => setIsExpanded(false)}
    />
  ) : (
    <DatabaseStatusSmall
      databases={databases}
      onExpand={() => setIsExpanded(true)}
    />
  );
};

const getDatabases = ({
  user,
  databases = [],
}: DatabaseStatusProps): Database[] => {
  return databases.filter(d => !d.is_sample && d.creator_id === user?.id);
};

export default DatabaseStatus;
