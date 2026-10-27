function randomizeCSS()
{
	//const cssFiles = ['css/main_pruinae.css', 'css/main_rayza.css', 'css/main_satelia.css', 'css/main_irilla.css']; // Replace with the paths to your CSS files.
	const cssFiles = ['css/main_pruinae.css']; // Replace with the paths to your CSS files.
	const randomIndex = Math.floor(Math.random() * cssFiles.length);
	const randomCSS = cssFiles[randomIndex];

	const cssLink = document.getElementById('cssLink');
	if (cssLink)
	{
		cssLink.href = randomCSS;
	}
	else
	{
		console.error("Element with id 'cssLink' not found!");
	}
}

randomizeCSS();

