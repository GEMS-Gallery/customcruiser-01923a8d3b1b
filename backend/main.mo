import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
  // Types
  type ProfileId = Nat;
  type PartId = Nat;

  type Profile = {
    id: ProfileId;
    name: Text;
    model: Text;
    year: Nat;
    description: Text;
  };

  type Part = {
    id: PartId;
    profileId: ProfileId;
    name: Text;
    description: Text;
    imageUrl: Text;
  };

  // State
  stable var nextProfileId : Nat = 0;
  stable var nextPartId : Nat = 0;
  let profiles = HashMap.HashMap<ProfileId, Profile>(0, Nat.equal, Nat.hash);
  let parts = HashMap.HashMap<PartId, Part>(0, Nat.equal, Nat.hash);

  // Profile Management
  public func createProfile(name: Text, model: Text, year: Nat, description: Text) : async ProfileId {
    let id = nextProfileId;
    nextProfileId += 1;
    let profile : Profile = {
      id;
      name;
      model;
      year;
      description;
    };
    profiles.put(id, profile);
    id
  };

  public query func getProfile(id: ProfileId) : async ?Profile {
    profiles.get(id)
  };

  public func updateProfile(id: ProfileId, name: Text, model: Text, year: Nat, description: Text) : async Bool {
    switch (profiles.get(id)) {
      case (null) { false };
      case (?existingProfile) {
        let updatedProfile : Profile = {
          id;
          name;
          model;
          year;
          description;
        };
        profiles.put(id, updatedProfile);
        true
      };
    }
  };

  // Part Management
  public func addPart(profileId: ProfileId, name: Text, description: Text, imageUrl: Text) : async ?PartId {
    switch (profiles.get(profileId)) {
      case (null) { null };
      case (?_) {
        let id = nextPartId;
        nextPartId += 1;
        let part : Part = {
          id;
          profileId;
          name;
          description;
          imageUrl;
        };
        parts.put(id, part);
        ?id
      };
    }
  };

  public query func getPartsForProfile(profileId: ProfileId) : async [Part] {
    Iter.toArray(Iter.filter(parts.vals(), func (p: Part) : Bool { p.profileId == profileId }))
  };

  // Upgrade hooks
  system func preupgrade() {
    // This function intentionally left empty as we're using stable variables
  };

  system func postupgrade() {
    // This function intentionally left empty as we're using stable variables
  };
}
