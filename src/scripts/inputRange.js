export function applyInputRangeStyle() {
    const inputRange = document.querySelector(".price__range");

    if (!inputRange) return; 

    inputRange.addEventListener("input", (event) => {
        const currentInputValue = event.target.value;
        const runnableTrackProgress = (currentInputValue / inputRange.max) * 100;

        inputRange.style.background = `linear-gradient(to right, var(--purple) ${runnableTrackProgress}%, var(--gray5) ${runnableTrackProgress}%)`;
    });
}