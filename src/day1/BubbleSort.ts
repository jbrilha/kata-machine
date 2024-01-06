export default function bubble_sort(arr: number[]): void {
    function swap(i: number, j: number): void {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    for(let i = 0; i < arr.length; i++)
        for(let j = 0; j < arr.length - 1 - i; j++)
            if(arr[j] > arr[j + 1])
                swap(j, j + 1);
}
