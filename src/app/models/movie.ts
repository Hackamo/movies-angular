export class Movie {
  private _adult: string;
  private _backdrop_path: string;
  private _genre_ids: string;
  private _id: string;
  private _original_language: string;
  private _original_title: string;
  private _overview: string;
  private _popularity: string;
  private _poster_path: string;
  private _release_date: string;
  private _title: string;
  private _video: string;
  private _vote_average: string;
  private _vote_count: string;
  private _name: string;

  constructor(
    adult: string,
    backdrop_path: string,
    genre_ids: string,
    id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: string,
    poster_path: string,
    release_date: string,
    title: string,
    video: string,
    vote_average: string,
    vote_count: string,
    name: string
  ) {
    this._adult = adult;
    this._backdrop_path = backdrop_path;
    this._genre_ids = genre_ids;
    this._id = id;
    this._original_language = original_language;
    this._original_title = original_title;
    this._overview = overview;
    this._popularity = popularity;
    this._poster_path = poster_path;
    this._release_date = release_date;
    this._title = title;
    this._video = video;
    this._vote_average = vote_average;
    this._vote_count = vote_count;
    this._name = name;
  }

  public get adult(): string {
    return this._adult;
  }
  public set adult(value: string) {
    this._adult = value;
  }
  public get backdrop_path(): string {
    return this._backdrop_path;
  }
  public set backdrop_path(value: string) {
    this._backdrop_path = value;
  }
  public get genre_ids(): string {
    return this._genre_ids;
  }
  public set genre_ids(value: string) {
    this._genre_ids = value;
  }
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get original_language(): string {
    return this._original_language;
  }
  public set original_language(value: string) {
    this._original_language = value;
  }
  public get original_title(): string {
    return this._original_title;
  }
  public set original_title(value: string) {
    this._original_title = value;
  }
  public get overview(): string {
    return this._overview;
  }
  public set overview(value: string) {
    this._overview = value;
  }
  public get popularity(): string {
    return this._popularity;
  }
  public set popularity(value: string) {
    this._popularity = value;
  }
  public get poster_path(): string {
    return this._poster_path;
  }
  public set poster_path(value: string) {
    this._poster_path = value;
  }
  public get release_date(): string {
    return this._release_date;
  }
  public set release_date(value: string) {
    this._release_date = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get video(): string {
    return this._video;
  }
  public set video(value: string) {
    this._video = value;
  }
  public get vote_average(): string {
    return this._vote_average;
  }
  public set vote_average(value: string) {
    this._vote_average = value;
  }
  public get vote_count(): string {
    return this._vote_count;
  }
  public set vote_count(value: string) {
    this._vote_count = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
}
