export namespace database {
	
	export class PlayerMatch {
	    id: number;
	    match_id: number;
	    player_id: number;
	    Player: Player;
	
	    static createFrom(source: any = {}) {
	        return new PlayerMatch(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.match_id = source["match_id"];
	        this.player_id = source["player_id"];
	        this.Player = this.convertValues(source["Player"], Player);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Player {
	    id: number;
	    discord_name: string;
	    riichi_city_name: string;
	    discord_id: number;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	    // Go type: time
	    deleted_at?: any;
	    Registrations: RegisterTournament[];
	    PlayerMatches: PlayerMatch[];
	
	    static createFrom(source: any = {}) {
	        return new Player(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.discord_name = source["discord_name"];
	        this.riichi_city_name = source["riichi_city_name"];
	        this.discord_id = source["discord_id"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	        this.deleted_at = this.convertValues(source["deleted_at"], null);
	        this.Registrations = this.convertValues(source["Registrations"], RegisterTournament);
	        this.PlayerMatches = this.convertValues(source["PlayerMatches"], PlayerMatch);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class RegisterTournament {
	    id: number;
	    player_id: number;
	    tournament_id: number;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	    // Go type: time
	    deleted_at?: any;
	    Player: Player;
	    Tournament: Tournament;
	
	    static createFrom(source: any = {}) {
	        return new RegisterTournament(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.player_id = source["player_id"];
	        this.tournament_id = source["tournament_id"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	        this.deleted_at = this.convertValues(source["deleted_at"], null);
	        this.Player = this.convertValues(source["Player"], Player);
	        this.Tournament = this.convertValues(source["Tournament"], Tournament);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Tournament {
	    id: number;
	    name: string;
	    description: string;
	    // Go type: time
	    start_at: any;
	    // Go type: time
	    end_at: any;
	    active: boolean;
	    role_id: string;
	    // Go type: time
	    register_end?: any;
	    classify_id: string;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	    // Go type: time
	    deleted_at?: any;
	    Registrations: RegisterTournament[];
	    Matches: Match[];
	
	    static createFrom(source: any = {}) {
	        return new Tournament(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.start_at = this.convertValues(source["start_at"], null);
	        this.end_at = this.convertValues(source["end_at"], null);
	        this.active = source["active"];
	        this.role_id = source["role_id"];
	        this.register_end = this.convertValues(source["register_end"], null);
	        this.classify_id = source["classify_id"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	        this.deleted_at = this.convertValues(source["deleted_at"], null);
	        this.Registrations = this.convertValues(source["Registrations"], RegisterTournament);
	        this.Matches = this.convertValues(source["Matches"], Match);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Match {
	    id: number;
	    tournament_id: number;
	    status: number;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	    // Go type: time
	    deleted_at?: any;
	    Tournament: Tournament;
	    PlayerMatches: PlayerMatch[];
	
	    static createFrom(source: any = {}) {
	        return new Match(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.tournament_id = source["tournament_id"];
	        this.status = source["status"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	        this.deleted_at = this.convertValues(source["deleted_at"], null);
	        this.Tournament = this.convertValues(source["Tournament"], Tournament);
	        this.PlayerMatches = this.convertValues(source["PlayerMatches"], PlayerMatch);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Pagination {
	    Page: number;
	    Size: number;
	    SortBy: string;
	    Sort: string;
	    Search: string;
	
	    static createFrom(source: any = {}) {
	        return new Pagination(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Page = source["Page"];
	        this.Size = source["Size"];
	        this.SortBy = source["SortBy"];
	        this.Sort = source["Sort"];
	        this.Search = source["Search"];
	    }
	}
	export class PaginationMatch {
	    Pagination: Pagination;
	    FromDate?: string;
	    ToDate?: string;
	
	    static createFrom(source: any = {}) {
	        return new PaginationMatch(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Pagination = this.convertValues(source["Pagination"], Pagination);
	        this.FromDate = source["FromDate"];
	        this.ToDate = source["ToDate"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PaginationTournament {
	    Pagination: Pagination;
	    FromDate?: string;
	    ToDate?: string;
	
	    static createFrom(source: any = {}) {
	        return new PaginationTournament(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Pagination = this.convertValues(source["Pagination"], Pagination);
	        this.FromDate = source["FromDate"];
	        this.ToDate = source["ToDate"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	
	
	export class TournamentMatchPlayer {
	    id: number;
	    tournament_match_id: string;
	    score: number;
	    point: number;
	    penalty: number;
	    final_point: number;
	    player_id: number;
	    Player: Player;
	
	    static createFrom(source: any = {}) {
	        return new TournamentMatchPlayer(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.tournament_match_id = source["tournament_match_id"];
	        this.score = source["score"];
	        this.point = source["point"];
	        this.penalty = source["penalty"];
	        this.final_point = source["final_point"];
	        this.player_id = source["player_id"];
	        this.Player = this.convertValues(source["Player"], Player);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TournamentMatch {
	    id: string;
	    pai_pu_id: string;
	    tournament_id: number;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	    // Go type: time
	    deleted_at?: any;
	    Tournament: Tournament;
	    TournamentMatchPlayers: TournamentMatchPlayer[];
	
	    static createFrom(source: any = {}) {
	        return new TournamentMatch(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.pai_pu_id = source["pai_pu_id"];
	        this.tournament_id = source["tournament_id"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	        this.deleted_at = this.convertValues(source["deleted_at"], null);
	        this.Tournament = this.convertValues(source["Tournament"], Tournament);
	        this.TournamentMatchPlayers = this.convertValues(source["TournamentMatchPlayers"], TournamentMatchPlayer);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace riichicommand {
	
	export class HandEventRecord {
	    data: string;
	    eventPos: number;
	    eventType: number;
	    handId: string;
	    startTime: number;
	    userId: number;
	
	    static createFrom(source: any = {}) {
	        return new HandEventRecord(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.data = source["data"];
	        this.eventPos = source["eventPos"];
	        this.eventType = source["eventType"];
	        this.handId = source["handId"];
	        this.startTime = source["startTime"];
	        this.userId = source["userId"];
	    }
	}
	export class Player {
	    cardBackID: number;
	    gameMusicId: number;
	    handId: number;
	    headTag: number;
	    identity: number;
	    matchMusicId: number;
	    model: number;
	    mortalModule: string;
	    nickname: string;
	    points: number;
	    position: number;
	    profileFrameId: number;
	    randGameMusicIDs: number[];
	    randGameMusicModel: number;
	    riichiEffectId: number;
	    riichiMusicId: number;
	    riichiStickID: number;
	    robotLevel: number;
	    roleID: number;
	    skinID: number;
	    specialEffectID: number;
	    tableClothID: number;
	    titleID: number;
	    userTag: number;
	
	    static createFrom(source: any = {}) {
	        return new Player(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.cardBackID = source["cardBackID"];
	        this.gameMusicId = source["gameMusicId"];
	        this.handId = source["handId"];
	        this.headTag = source["headTag"];
	        this.identity = source["identity"];
	        this.matchMusicId = source["matchMusicId"];
	        this.model = source["model"];
	        this.mortalModule = source["mortalModule"];
	        this.nickname = source["nickname"];
	        this.points = source["points"];
	        this.position = source["position"];
	        this.profileFrameId = source["profileFrameId"];
	        this.randGameMusicIDs = source["randGameMusicIDs"];
	        this.randGameMusicModel = source["randGameMusicModel"];
	        this.riichiEffectId = source["riichiEffectId"];
	        this.riichiMusicId = source["riichiMusicId"];
	        this.riichiStickID = source["riichiStickID"];
	        this.robotLevel = source["robotLevel"];
	        this.roleID = source["roleID"];
	        this.skinID = source["skinID"];
	        this.specialEffectID = source["specialEffectID"];
	        this.tableClothID = source["tableClothID"];
	        this.titleID = source["titleID"];
	        this.userTag = source["userTag"];
	    }
	}
	export class HandRecord {
	    benChangNum: number;
	    changCi: number;
	    handPos: number;
	    quanFeng: number;
	    handCardEncode: string;
	    handCardsSHA256: string;
	    handID: string;
	    handEventRecord: HandEventRecord[];
	    paiShan: number[];
	    players: Player[];
	    symbolEventRecord: any[];
	
	    static createFrom(source: any = {}) {
	        return new HandRecord(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.benChangNum = source["benChangNum"];
	        this.changCi = source["changCi"];
	        this.handPos = source["handPos"];
	        this.quanFeng = source["quanFeng"];
	        this.handCardEncode = source["handCardEncode"];
	        this.handCardsSHA256 = source["handCardsSHA256"];
	        this.handID = source["handID"];
	        this.handEventRecord = this.convertValues(source["handEventRecord"], HandEventRecord);
	        this.paiShan = source["paiShan"];
	        this.players = this.convertValues(source["players"], Player);
	        this.symbolEventRecord = source["symbolEventRecord"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Log {
	    fangFu: number;
	    gameMode: number;
	    gamePlay: number;
	    handRecord: HandRecord[];
	    initPoints: number;
	    keyValue: string;
	    nowTime: number;
	    remark: string;
	    roomId: string;
	
	    static createFrom(source: any = {}) {
	        return new Log(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.fangFu = source["fangFu"];
	        this.gameMode = source["gameMode"];
	        this.gamePlay = source["gamePlay"];
	        this.handRecord = this.convertValues(source["handRecord"], HandRecord);
	        this.initPoints = source["initPoints"];
	        this.keyValue = source["keyValue"];
	        this.nowTime = source["nowTime"];
	        this.remark = source["remark"];
	        this.roomId = source["roomId"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

