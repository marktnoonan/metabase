import React from "react";
import { Drill } from "metabase/modes/types";
import {
  quickFilterDrill,
  quickFilterDrillQuestion,
} from "metabase-lib/queries/drills/quick-filter-drill";

const QuickFilterDrill: Drill = ({ question, clicked }) => {
  const drill = quickFilterDrill({ question, clicked });
  if (!drill) {
    return [];
  }

  return drill.operators.map(({ name, filter }) => ({
    name,
    title: <span className="h2">{name}</span>,
    section: "filter",
    buttonType: "token-filter",
    question: () => quickFilterDrillQuestion({ question, clicked, filter }),
  }));
};

export default QuickFilterDrill;
