export enum LearnAPIContentType {
  TUTORIAL = "tutorial",
  PROJECT = "project",
}

export interface LearnAPIImage {
  big: string;
  url: string;
}

export interface LearnAPIThumbnail {
  url: string;
}

export interface LearnAPIAsset {
  mainImage: LearnAPIImage;
  name: string;
  packageId: string;
}

export interface LearnAPIStat {
  collectCount: number;
  commentCount: number;
  createdTime: string;
  id: string;
  recordCount: number;
  shareCount: number;
  updatedTime: string;
  viewCount: number;
}

export interface LearnAPIStatMap {
  [id: string]: LearnAPIStat;
}

export interface LearnAPIUserStat {
  avatar: string;
  favoriteCount: number;
  followCount: number;
  followingCount: number;
  id: string;
  jobRoleIds: string[];
  lastLoginTime: string;
  likeCount: number;
  name: string;
  title: string;
  username: string;
}

export interface LearnAPIUserStatMap {
  [id: string]: LearnAPIUserStat;
}

export interface LearnAPIBaseContent {
  asset: LearnAPIAsset;
  authorId?: string;
  contentIds: string[];
  createdTime: string;
  deletedTime?: string;
  descPlain: string;
  description: string;
  draftTime?: number;
  duration: number;
  hidden: boolean;
  id: string;
  isChallenge: boolean;
  language: string;
  type: string;
  title: string;
  slug: string;
  skillLevel: string;
  ownerId: string;
  thumbnail: LearnAPIThumbnail;
  premium: boolean;
  statsMap: LearnAPIStatMap;
  userMap: LearnAPIUserStatMap;
}

export interface LearnAPIProject extends LearnAPIBaseContent {
  another_prop: string;
}
export interface LearnAPITutorial extends LearnAPIBaseContent {
  another_prop: string;
}

export interface LearnAPIContent {
  highlightName: string;
  type: LearnAPIContentType;
  project?: LearnAPIProject;
  tutorial?: LearnAPITutorial;
}
export interface LearnAPIResponse {
  total: number;
  page: string;
  pageSize: string;
  results?: LearnAPIContent[];
}
