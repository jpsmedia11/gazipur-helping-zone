import List "mo:core/List";
import Float "mo:core/Float";
import Types "../types/providers";

module {
  public type State = List.List<Types.Provider>;

  /// Convert mutable Provider to shared ProviderView
  public func toView(p : Types.Provider) : Types.ProviderView {
    {
      id = p.id;
      name = p.name;
      category = p.category;
      description = p.description;
      phone = p.phone;
      email = p.email;
      address = p.address;
      area = p.area;
      experience = p.experience;
      priceRange = p.priceRange;
      availability = p.availability;
      rating = p.rating;
      reviewCount = p.reviewCount;
      isActive = p.isActive;
    };
  };

  /// Sort views by rating descending
  func sortByRating(views : [Types.ProviderView]) : [Types.ProviderView] {
    views.sort(func(a, b) {
      if (a.rating > b.rating) #less
      else if (a.rating < b.rating) #greater
      else #equal
    })
  };

  /// Paginate an array
  func paginate(items : [Types.ProviderView], page : Nat, pageSize : Nat) : Types.PageResult {
    let total = items.size();
    let ps = if (pageSize == 0) 10 else pageSize;
    let start = page * ps;
    if (start >= total) {
      return { items = []; total; page; pageSize = ps };
    };
    let end = if (start + ps > total) total else start + ps;
    let slice = items.sliceToArray(start, end);
    { items = slice; total; page; pageSize = ps };
  };

  /// Get all active providers as views (paginated), sorted by rating descending
  public func listProviders(state : State, page : Nat, pageSize : Nat) : Types.PageResult {
    let active = state.filter(func(p) { p.isActive });
    let views = active.toArray().map(toView);
    let sorted = sortByRating(views);
    paginate(sorted, page, pageSize);
  };

  /// Get providers by category (paginated)
  public func listByCategory(state : State, category : Types.Category, page : Nat, pageSize : Nat) : Types.PageResult {
    let filtered = state.filter(func(p) { p.isActive and p.category == category });
    let views = filtered.toArray().map(toView);
    let sorted = sortByRating(views);
    paginate(sorted, page, pageSize);
  };

  /// Get providers by area (paginated)
  public func listByArea(state : State, area : Text, page : Nat, pageSize : Nat) : Types.PageResult {
    let areaLower = area.toLower();
    let filtered = state.filter(func(p) { p.isActive and p.area.toLower().contains(#text areaLower) });
    let views = filtered.toArray().map(toView);
    let sorted = sortByRating(views);
    paginate(sorted, page, pageSize);
  };

  /// Search providers by keyword (name or area)
  public func searchProviders(state : State, keyword : Text, page : Nat, pageSize : Nat) : Types.PageResult {
    let kw = keyword.toLower();
    let filtered = state.filter(func(p) {
      p.isActive and (
        p.name.toLower().contains(#text kw) or
        p.area.toLower().contains(#text kw) or
        p.description.toLower().contains(#text kw)
      )
    });
    let views = filtered.toArray().map(toView);
    let sorted = sortByRating(views);
    paginate(sorted, page, pageSize);
  };

  /// Get a single provider by id
  public func getProvider(state : State, id : Types.ProviderId) : ?Types.ProviderView {
    switch (state.find(func(p) { p.id == id })) {
      case (?p) ?toView(p);
      case null null;
    };
  };

  /// Add a new provider; returns new id
  public func addProvider(state : State, nextId : Nat, args : Types.AddProviderArgs) : Types.ProviderId {
    let provider : Types.Provider = {
      id = nextId;
      name = args.name;
      category = args.category;
      description = args.description;
      phone = args.phone;
      email = args.email;
      address = args.address;
      area = args.area;
      experience = args.experience;
      priceRange = args.priceRange;
      availability = args.availability;
      var rating = 0.0;
      var reviewCount = 0;
      var isActive = true;
    };
    state.add(provider);
    nextId;
  };

  /// Update an existing provider; returns false if not found
  public func updateProvider(state : State, args : Types.UpdateProviderArgs) : Bool {
    switch (state.find(func(p) { p.id == args.id })) {
      case null false;
      case (?_) {
        // Use mapInPlace to update the matched provider
        state.mapInPlace(func(p) {
          if (p.id != args.id) p
          else {
            let name = switch (args.name) { case (?v) v; case null p.name };
            let category = switch (args.category) { case (?v) v; case null p.category };
            let description = switch (args.description) { case (?v) v; case null p.description };
            let phone = switch (args.phone) { case (?v) v; case null p.phone };
            let email = switch (args.email) { case (?v) v; case null p.email };
            let address = switch (args.address) { case (?v) v; case null p.address };
            let area = switch (args.area) { case (?v) v; case null p.area };
            let experience = switch (args.experience) { case (?v) v; case null p.experience };
            let priceRange = switch (args.priceRange) { case (?v) v; case null p.priceRange };
            let availability = switch (args.availability) { case (?v) v; case null p.availability };
            let isActive = switch (args.isActive) { case (?v) v; case null p.isActive };
            {
              id = p.id;
              name;
              category;
              description;
              phone;
              email;
              address;
              area;
              experience;
              priceRange;
              availability;
              var rating = p.rating;
              var reviewCount = p.reviewCount;
              var isActive;
            };
          }
        });
        true;
      };
    };
  };

  /// Seed sample providers into state; returns next available id
  public func seedSampleData(state : State, startId : Nat) : Nat {
    let samples : [(Text, Types.Category, Text, Text, Text, Text, Text, Nat, Types.PriceRange, Text, Float)] = [
      // (name, category, description, phone, email, address, area, experience, priceRange, availability, rating)
      ("মোঃ রফিকুল ইসলাম", #Plumbing, "পাইপ মেরামত, বাথরুম ফিটিং ও পানির লাইন স্থাপনে অভিজ্ঞ", "01711-234567", "rafiqul.plumber@gmail.com", "টঙ্গী বাজার রোড", "Tongi", 8, #Low, "শনি–বৃহস্পতিবার সকাল ৮টা–রাত ৮টা", 4.5),
      ("আবুল কালাম ইলেকট্রিশিয়ান", #Electrical, "ঘরবাড়ি ও অফিসের ওয়্যারিং, মিটার বোর্ড সংযোগ", "01812-345678", "abul.electric@gmail.com", "গাজীপুর সদর, ঢাকা রোড", "Gazipur Sadar", 10, #Medium, "রবি–শুক্রবার সকাল ৯টা–সন্ধ্যা ৭টা", 4.7),
      ("সুমাইয়া ক্লিনিং সার্ভিস", #Cleaning, "বাড়ি ও অফিস পরিষ্কার, ঈদের আগে বিশেষ সেবা", "01912-456789", "sumaiya.clean@gmail.com", "কালিয়াকৈর সেন্টার", "Kaliakair", 5, #Low, "সোম–শনিবার সকাল ৭টা–বিকেল ৫টা", 4.2),
      ("মাস্টার আনোয়ার টিউটর", #Tutoring, "গণিত, বিজ্ঞান ও ইংরেজি (৬ষ্ঠ–১২শ শ্রেণি)", "01611-567890", "anowar.tutor@gmail.com", "কাপাসিয়া বাজার এলাকা", "Kapasia", 12, #Medium, "বিকেল ৩টা–রাত ৯টা (সব দিন)", 4.8),
      ("রহিম কার্পেন্টার", #Carpentry, "আসবাবপত্র তৈরি, দরজা-জানালা মেরামত ও কাঠের কাজ", "01711-678901", "rahim.carpenter@gmail.com", "শ্রীপুর বাজার রোড", "Sreepur", 15, #Medium, "সোম–শনিবার সকাল ৮টা–সন্ধ্যা ৬টা", 4.6),
      ("করিম পেইন্টার", #Painting, "ঘরবাড়ি ও অফিস রং করা, পুটি ও ডিজাইন পেইন্টিং", "01812-789012", "karim.painter@gmail.com", "টঙ্গী পূর্ব থানা রোড", "Tongi", 7, #Low, "সোম–শুক্রবার সকাল ৮টা–সন্ধ্যা ৭টা", 4.1),
      ("ফ্রেশ এয়ার AC সার্ভিস", #ACRepair, "এসি ইনস্টলেশন, সার্ভিসিং ও গ্যাস রিফিলিং", "01912-890123", "freshair.ac@gmail.com", "গাজীপুর সদর, জয়দেবপুর", "Gazipur Sadar", 6, #Medium, "সব দিন সকাল ৯টা–রাত ৮টা", 4.4),
      ("হাসান অটো গ্যারেজ", #CarRepair, "গাড়ি সার্ভিসিং, ইঞ্জিন মেরামত ও বডি ওয়ার্ক", "01611-901234", "hasan.garage@gmail.com", "কালিয়াকৈর শিল্প এলাকা", "Kaliakair", 9, #High, "শনি–বৃহস্পতিবার সকাল ৮টা–বিকেল ৬টা", 4.3),
      ("নাসরিন টেইলারিং", #Tailoring, "মহিলা ও পুরুষের পোশাক তৈরি, ব্লাউজ ও পর্দা সেলাই", "01711-012345", "nasrin.tailoring@gmail.com", "কাপাসিয়া পৌর এলাকা", "Kapasia", 11, #Low, "শনি–বৃহস্পতিবার সকাল ৯টা–রাত ৮টা", 4.6),
      ("মোঃ জাহিদ প্লাম্বার", #Plumbing, "বাণিজ্যিক ভবনের পাইপলাইন ও ট্যাংক সংযোগ বিশেষজ্ঞ", "01812-123456", "zahid.plumber@gmail.com", "শ্রীপুর ইন্ডাস্ট্রিয়াল এলাকা", "Sreepur", 13, #High, "রবি–শুক্রবার সকাল ৭টা–রাত ৯টা", 4.9),
      ("সোলার ও ইলেকট্রিক সেবা", #Electrical, "সোলার প্যানেল ইনস্টলেশন ও শিল্প কারখানার ওয়্যারিং", "01912-234567", "solar.electric@gmail.com", "টঙ্গী শিল্প এলাকা", "Tongi", 8, #High, "সব দিন সকাল ৮টা–সন্ধ্যা ৬টা", 4.0),
      ("ক্লিন হোম সার্ভিস", #Cleaning, "ডিপ ক্লিনিং, কারপেট ও সোফা পরিষ্কার", "01611-345678", "cleanhome@gmail.com", "গাজীপুর সদর, বোর্ড বাজার", "Gazipur Sadar", 4, #Medium, "সোম–শনিবার সকাল ৮টা–বিকেল ৫টা", 3.8),
      ("প্রফেসর আমিন গৃহশিক্ষক", #Tutoring, "পিএইচডি — পদার্থবিজ্ঞান ও উচ্চতর গণিত (HSC ও বিশ্ববিদ্যালয়)", "01711-456789", "amin.tutor@gmail.com", "কাপাসিয়া উপজেলা সদর", "Kapasia", 20, #High, "বিকেল ৪টা–রাত ১০টা (রবি–বৃহস্পতিবার)", 5.0),
      ("মেহেদী ফার্নিচার ওয়ার্কশপ", #Carpentry, "কাস্টম মেড আসবাবপত্র, ইন্টেরিয়র কাঠের কাজ", "01812-567890", "mehedi.furniture@gmail.com", "কালিয়াকৈর মেইন রোড", "Kaliakair", 18, #High, "শনি–বৃহস্পতিবার সকাল ৯টা–সন্ধ্যা ৬টা", 4.7),
      ("রঙধনু পেইন্টিং সার্ভিস", #Painting, "থ্রিডি ওয়ালপেপার, টেক্সচার পেইন্টিং ও গ্রাফিতি আর্ট", "01912-678901", "rangdhonu.paint@gmail.com", "শ্রীপুর নগর এলাকা", "Sreepur", 6, #Medium, "সোম–শুক্রবার সকাল ৯টা–সন্ধ্যা ৭টা", 4.3),
      ("কুল টেক AC সেন্টার", #ACRepair, "সব ব্র্যান্ডের এসি মেরামত, ওয়্যারেন্টি সেবা", "01611-789012", "cooltech.ac@gmail.com", "টঙ্গী পশ্চিম, আমিন বাজার রোড", "Tongi", 7, #Low, "সব দিন সকাল ১০টা–রাত ৮টা", 3.9),
      ("স্পিড অটো ওয়ার্কশপ", #CarRepair, "দ্রুত সার্ভিসিং, এসি মেরামত ও টায়ার পরিবর্তন", "01711-890123", "speed.auto@gmail.com", "গাজীপুর সদর, টেলিফোন শাখা রোড", "Gazipur Sadar", 5, #Low, "শনি–বৃহস্পতিবার সকাল ৭টা–রাত ৮টা", 3.7),
      ("ফ্যাশন টেইলার্স", #Tailoring, "বিয়ের শাড়ি ও গাউন সেলাই, বিশেষ অনুষ্ঠানের পোশাক", "01812-901234", "fashion.tailors@gmail.com", "কালিয়াকৈর বাজার, মেইন স্ট্রিট", "Kaliakair", 14, #Medium, "শনি–বৃহস্পতিবার সকাল ১০টা–রাত ৯টা", 4.5),
      ("গাজীপুর হোম সার্ভিসেস", #Others, "ইলেকট্রিক্যাল, প্লাম্বিং ও সাধারণ গৃহ রক্ষণাবেক্ষণ", "01912-012345", "gazipur.home@gmail.com", "কাপাসিয়া বাজার, মেইন রোড", "Kapasia", 3, #Low, "সব দিন সকাল ৮টা–রাত ১০টা", 4.0),
      ("সুপার ক্লিন সার্ভিসেস", #Cleaning, "ইন্ডাস্ট্রিয়াল ক্লিনিং, কারখানা ও গুদাম পরিষ্কার", "01611-123456", "superclean@gmail.com", "শ্রীপুর শিল্প এলাকা", "Sreepur", 7, #High, "রবি–শুক্রবার সকাল ৬টা–বিকেল ৫টা", 4.2),
    ];

    var id = startId;
    for ((name, category, description, phone, email, address, area, experience, priceRange, availability, rating) in samples.values()) {
      let provider : Types.Provider = {
        id;
        name;
        category;
        description;
        phone;
        email;
        address;
        area;
        experience;
        priceRange;
        availability;
        var rating;
        var reviewCount = 0;
        var isActive = true;
      };
      state.add(provider);
      id += 1;
    };
    id;
  };
};
