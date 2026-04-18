import List "mo:core/List";
import Types "types/providers";
import ProvidersLib "lib/providers";
import ProvidersApi "mixins/providers-api";

actor {
  let providers = List.empty<Types.Provider>();

  // Seed sample data on first deploy (starts at id 1, returns next id)
  ignore ProvidersLib.seedSampleData(providers, 1);

  include ProvidersApi(providers);
};
