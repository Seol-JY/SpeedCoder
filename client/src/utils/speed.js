export default function speed(count, Correctchr, Spacechr) {
  // 타자속도 지정함수
  let sp = Math.floor((60 / count) * (Correctchr - Spacechr));
  if (sp === Infinity || isNaN(sp)) {
    return 0;
  }

  if (sp < 0) {
    sp = 0;
  }
  return sp;
}
