function getSafeNumbers(array: (string | undefined)[] | undefined) {
  return (
    array
      ?.filter(
        (element) =>
          !!element && parseFloat(element) && !Number.isNaN(parseFloat(element))
      )
      .map((element) => parseFloat(element!)) ?? []
  );
}

export default getSafeNumbers;
