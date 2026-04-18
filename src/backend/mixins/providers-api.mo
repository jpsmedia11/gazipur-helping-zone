import List "mo:core/List";
import Types "../types/providers";
import ProvidersLib "../lib/providers";

mixin (
  providers : List.List<Types.Provider>,
) {

  // Starts at 21 because seed data occupies ids 1–20
  var nextProviderId : Nat = 21;

  /// List all active providers with pagination
  public query func listProviders(page : Nat, pageSize : Nat) : async Types.PageResult {
    ProvidersLib.listProviders(providers, page, pageSize);
  };

  /// List providers by category
  public query func listProvidersByCategory(category : Types.Category, page : Nat, pageSize : Nat) : async Types.PageResult {
    ProvidersLib.listByCategory(providers, category, page, pageSize);
  };

  /// List providers by area within Gazipur
  public query func listProvidersByArea(area : Text, page : Nat, pageSize : Nat) : async Types.PageResult {
    ProvidersLib.listByArea(providers, area, page, pageSize);
  };

  /// Search providers by name or description keyword
  public query func searchProviders(keyword : Text, page : Nat, pageSize : Nat) : async Types.PageResult {
    ProvidersLib.searchProviders(providers, keyword, page, pageSize);
  };

  /// Get a single provider by id
  public query func getProvider(id : Types.ProviderId) : async ?Types.ProviderView {
    ProvidersLib.getProvider(providers, id);
  };

  /// Admin: add a new service provider
  public shared ({ caller = _ }) func addProvider(args : Types.AddProviderArgs) : async Types.ProviderId {
    let newId = ProvidersLib.addProvider(providers, nextProviderId, args);
    nextProviderId += 1;
    newId;
  };

  /// Admin: update an existing service provider
  public shared ({ caller = _ }) func updateProvider(args : Types.UpdateProviderArgs) : async Bool {
    ProvidersLib.updateProvider(providers, args);
  };
};
