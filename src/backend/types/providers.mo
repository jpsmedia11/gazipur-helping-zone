import Common "common";

module {
  public type ProviderId = Common.ProviderId;

  public type Category = {
    #Plumbing;
    #Electrical;
    #Cleaning;
    #Tutoring;
    #Carpentry;
    #Painting;
    #ACRepair;
    #CarRepair;
    #Tailoring;
    #Others;
  };

  public type PriceRange = {
    #Low;      // budget-friendly
    #Medium;   // moderate
    #High;     // premium
  };

  public type Provider = {
    id : ProviderId;
    name : Text;
    category : Category;
    description : Text;
    phone : Text;
    email : Text;
    address : Text;
    area : Text;            // area within Gazipur
    experience : Nat;       // years of experience
    priceRange : PriceRange;
    availability : Text;    // e.g., "Mon–Fri 9am–6pm"
    var rating : Float;
    var reviewCount : Nat;
    var isActive : Bool;
  };

  // Shared (immutable) version of Provider for public API
  public type ProviderView = {
    id : ProviderId;
    name : Text;
    category : Category;
    description : Text;
    phone : Text;
    email : Text;
    address : Text;
    area : Text;
    experience : Nat;
    priceRange : PriceRange;
    availability : Text;
    rating : Float;
    reviewCount : Nat;
    isActive : Bool;
  };

  public type AddProviderArgs = {
    name : Text;
    category : Category;
    description : Text;
    phone : Text;
    email : Text;
    address : Text;
    area : Text;
    experience : Nat;
    priceRange : PriceRange;
    availability : Text;
  };

  public type UpdateProviderArgs = {
    id : ProviderId;
    name : ?Text;
    category : ?Category;
    description : ?Text;
    phone : ?Text;
    email : ?Text;
    address : ?Text;
    area : ?Text;
    experience : ?Nat;
    priceRange : ?PriceRange;
    availability : ?Text;
    isActive : ?Bool;
  };

  public type PageResult = {
    items : [ProviderView];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };
};
