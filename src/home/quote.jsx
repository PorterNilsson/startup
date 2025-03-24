import React from "react";

export function Quote() {
	const [randomQuote, setRandomQuote] = React.useState("");

	React.useEffect(() => {

    // Uses the backend as a proxy because virtually all of free APIs I found had CORS disabled...
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
    .then((response) => response.json())
    .then((data) => {
      // console.log("DATA");
      // console.log(data);
      setRandomQuote(`${data.text || 'Unavaliable'}`);
    });

	}, [])

  return (
    <div className="proverb">
      <p>Random Fact: {randomQuote}</p>
    </div>
  );
}
