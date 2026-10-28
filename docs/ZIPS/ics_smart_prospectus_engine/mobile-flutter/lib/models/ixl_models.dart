class IcsUserProfile {
  final String icsId;
  final String fullName;
  final String? admissionNumber;
  final String? courseName;
  final String? level;
  final String? campus;
  final String? modeOfStudy;
  final String status;
  IcsUserProfile({required this.icsId, required this.fullName, this.admissionNumber, this.courseName, this.level, this.campus, this.modeOfStudy, required this.status});
  factory IcsUserProfile.fromJson(Map<String,dynamic> json)=>IcsUserProfile(icsId: json['icsId'], fullName: json['profile']?['fullName'] ?? '', admissionNumber: json['profile']?['admissionNumber'], courseName: json['profile']?['courseName'], level: json['profile']?['level'], campus: json['profile']?['campus'], modeOfStudy: json['profile']?['modeOfStudy'], status: json['status']);
}
class NavigationTileModel { final String code,title,system,routePath; final String? icon; NavigationTileModel({required this.code,required this.title,required this.system,required this.routePath,this.icon}); factory NavigationTileModel.fromJson(Map<String,dynamic> j)=>NavigationTileModel(code:j['code'],title:j['title'],system:j['system'],routePath:j['routePath'],icon:j['icon']); }
class TranscriptItemModel { final String type,title,status; final num? score; final String? grade; TranscriptItemModel({required this.type,required this.title,required this.status,this.score,this.grade}); factory TranscriptItemModel.fromJson(Map<String,dynamic> j)=>TranscriptItemModel(type:j['type'],title:j['title'],status:j['status'],score:j['score'],grade:j['grade']); }
class CompetencyPassportItemModel { final String category,skillName,level; final String? evidenceUrl; CompetencyPassportItemModel({required this.category,required this.skillName,required this.level,this.evidenceUrl}); factory CompetencyPassportItemModel.fromJson(Map<String,dynamic> j)=>CompetencyPassportItemModel(category:j['category'],skillName:j['skillName'],level:j['level'],evidenceUrl:j['evidenceUrl']); }
