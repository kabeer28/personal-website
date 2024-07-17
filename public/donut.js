document.addEventListener("DOMContentLoaded", function() {
    let A = 0, B = 0;

    const pre = document.getElementById("donut");
    const a = () => {
        let s = [], t = [];
        A += 0.02; B += 0.07;
        const o = Math.cos(A), e = Math.sin(A), n = Math.cos(B), c = Math.sin(B);
        for (let o = 0; o < 1760; o++) s[o] = o % 80 === 79 ? "\n" : " ", t[o] = 0;
        for (let i = 0; i < 6.28; i += 0.07) {
            const r = Math.cos(i), a = Math.sin(i);
            for (let i = 0; i < 6.28; i += 0.02) {
                const l = Math.sin(i), f = Math.cos(i), A = r + 2, B = 1 / (l * A * e + a * o + 5),
                    d = l * A * o - a * e, m = 40 + 30 * B * (f * A * n - d * c) | 0,
                    v = 12 + 15 * B * (f * A * c + d * n) | 0, I = m + 80 * v,
                    h = 8 * ((a * e - l * r * o) * n - l * r * e - a * o * f * r * c) | 0;
                if (v < 22 && v >= 0 && m >= 0 && m < 79 && B > t[I]) {
                    t[I] = B;
                    s[I] = ".,-~:;=!*#$@"[h > 0 ? h : 0];
                }
            }
        }
        pre.textContent = s.join("");
    };

    setInterval(a, 50);
});
