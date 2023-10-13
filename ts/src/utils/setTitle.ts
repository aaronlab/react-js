function setTitle(title: string) {
  const htmlTitle = document.querySelector("title");

  if (htmlTitle) {
    htmlTitle.innerText = title;
  }
}

export default setTitle;
