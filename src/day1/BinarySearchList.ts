export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;
    
    while(lo < hi){
        let m = lo + Math.floor((hi - lo) / 2);
        let v = haystack[m];
    
        if(v === needle)
            return true;
        else if ( v > needle)
            hi = m;
        else
            lo = m + 1;
    }

    return false;
}
