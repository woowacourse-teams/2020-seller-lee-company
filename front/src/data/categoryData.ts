import { Category } from "../types/types";

export const categories: Category[] = [
  "디지털/가전",
  "가구/인테리어",
  "유아동/유아도서",
  "생활/가공식품",
  "스포츠/레저",
  "여성잡화",
  "여성의류",
  "남성패션/잡화",
  "게임/취미",
  "뷰티/미용",
  "반려동물용품",
  "도서/티켓/음반",
  "기타 중고물품",
];

interface CategoryIconType {
  category: string;
  icon: string;
}

export const categoryIcons: CategoryIconType[] = [
  { category: "디지털/가전", icon: "💻" },
  { category: "가구/인테리어", icon: "🛌" },
  { category: "유아동/유아도서", icon: "🍼" },
  { category: "생활/가공식품", icon: "🍱" },
  { category: "스포츠/레저", icon: "🏃🏻" },
  { category: "여성잡화", icon: "👠" },
  { category: "여성의류", icon: "👗" },
  { category: "남성패션/잡화", icon: "👔" },
  { category: "게임/취미", icon: "🎮" },
  { category: "뷰티/미용", icon: "👩🏻‍🎨" },
  { category: "반려동물용품", icon: "🐶" },
  { category: "도서/티켓/음반", icon: "📚" },
  { category: "기타 중고물품", icon: "🛒" },
];
