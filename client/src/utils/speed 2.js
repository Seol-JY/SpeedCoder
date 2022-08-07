export default function speed(count, Correctchr) {
  // 타자속도 지정함수
  let sp = Math.floor((60 / count) * Correctchr);
  if (sp === Infinity || isNaN(sp)) { return 0; }
  return sp;
}
