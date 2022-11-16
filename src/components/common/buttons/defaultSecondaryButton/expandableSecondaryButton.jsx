export default function ExpandableSecondaryButton({ buttonName, onButtonClick }) {
  return (
    <button
      type="submit"
      onClick={onButtonClick}
      className="text-white bg-orangePri hover:bg-orangeSec focus:ring-2 focus:ring-grey font-medium rounded-lg text-sm px-5 py-2.5 row-span-2"
    >
      {buttonName}
    </button>
  );
}
