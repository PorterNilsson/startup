import React from "react";

export function Quote() {
	const [randomQuote, setRandomQuote] = React.useState("");

	React.useEffect(() => {

    // Uses the backend as a proxy because virtually all of free APIs I found had CORS disabled...
    fetch('/api/quote')
    .then((response) => response.json())
    .then((data) => {
      // console.log("DATA");
      // console.log(data);
      setRandomQuote(`${data.data.quote} -${data.data.author || 'Unknown'}`);
    });

	}, [])

  return (
    <div className="proverb">
      <p>Random Stoicism Quote: {randomQuote}</p>
    </div>
  );
}
