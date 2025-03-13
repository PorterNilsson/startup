import React from "react";

export function Scripture() {
	const [randomScripture, setRandomScripture] = React.useState("");

	React.useEffect(() => {
		setRandomScripture(
      "The fear of the Lord is the beginning of knowledge: but fools despise wisdom and instruction. (Proverbs 1:7)"
    );
	}, [])

  return (
    <div className="proverb">
      <p>{randomScripture}</p>
    </div>
  );
}
