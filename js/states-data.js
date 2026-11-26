// js/states-data.js - Wikipedia-accurate Administrative Divisions (States/Provinces/Regions) & City Mappings per Country

window.WIKIPEDIA_COUNTRY_DIVISIONS = {
  'India': {
    label: 'States & UTs',
    divisions: [
      { name: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Kurnool', 'Rajahmundry'] },
      { name: 'Arunachal Pradesh', cities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang'] },
      { name: 'Assam', cities: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Tezpur'] },
      { name: 'Bihar', cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia'] },
      { name: 'Chhattisgarh', cities: ['Raipur', 'Bilaspur', 'Bhilai', 'Durg', 'Korba'] },
      { name: 'Goa', cities: ['Panaji', 'Margao', 'Vasco', 'Mapusa', 'Ponda'] },
      { name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar', 'Jamnagar'] },
      { name: 'Haryana', cities: ['Gurugram', 'Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Rohtak', 'Karnal', 'Hisar'] },
      { name: 'Himachal Pradesh', cities: ['Shimla', 'Dharamshala', 'Manali', 'Kullu', 'Solan', 'Mandi'] },
      { name: 'Jharkhand', cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'] },
      { name: 'Karnataka', cities: ['Bangalore', 'Bengaluru', 'Mysore', 'Mysuru', 'Mangalore', 'Hubli', 'Belgaum'] },
      { name: 'Kerala', cities: ['Kochi', 'Cochin', 'Thiruvananthapuram', 'Trivandrum', 'Kozhikode', 'Calicut', 'Thrissur', 'Kannur'] },
      { name: 'Madhya Pradesh', cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar'] },
      { name: 'Maharashtra', cities: ['Mumbai', 'Bombay', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Kolhapur', 'Thane'] },
      { name: 'Manipur', cities: ['Imphal', 'Thoubal', 'Churachandpur'] },
      { name: 'Meghalaya', cities: ['Shillong', 'Tura', 'Jowai'] },
      { name: 'Mizoram', cities: ['Aizawl', 'Lunglei', 'Champhai'] },
      { name: 'Nagaland', cities: ['Kohima', 'Dimapur', 'Mokokchung'] },
      { name: 'Odisha', cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Sambalpur', 'Berhampur'] },
      { name: 'Punjab', cities: ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'] },
      { name: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'] },
      { name: 'Sikkim', cities: ['Gangtok', 'Namchi', 'Geyzing'] },
      { name: 'Tamil Nadu', cities: ['Chennai', 'Madras', 'Coimbatore', 'Madurai', 'Trichy', 'Tiruchirappalli', 'Salem', 'Tirunelveli'] },
      { name: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'] },
      { name: 'Tripura', cities: ['Agartala', 'Udaipur', 'Dharmanagar'] },
      { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Allahabad', 'Meerut', 'Ghaziabad', 'Noida'] },
      { name: 'Uttarakhand', cities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Roorkee', 'Haldwani'] },
      { name: 'West Bengal', cities: ['Kolkata', 'Calcutta', 'Howrah', 'Siliguri', 'Asansol', 'Durgapur', 'Darjeeling'] },
      // 8 Union Territories
      { name: 'Andaman and Nicobar Islands', cities: ['Port Blair', 'Havelock'] },
      { name: 'Chandigarh', cities: ['Chandigarh'] },
      { name: 'Dadra and Nagar Haveli and Daman and Diu', cities: ['Daman', 'Diu', 'Silvassa'] },
      { name: 'Delhi', cities: ['Delhi', 'New Delhi', 'NCR'] },
      { name: 'Jammu and Kashmir', cities: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla'] },
      { name: 'Ladakh', cities: ['Leh', 'Kargil'] },
      { name: 'Lakshadweep', cities: ['Kavaratti', 'Agatti', 'Amini'] },
      { name: 'Puducherry', cities: ['Puducherry', 'Pondicherry', 'Karaikal', 'Mahe', 'Yanam'] }
    ]
  },

  'USA': {
    label: 'States',
    divisions: [
      { name: 'Alabama', cities: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville'] },
      { name: 'Alaska', cities: ['Anchorage', 'Fairbanks', 'Juneau'] },
      { name: 'Arizona', cities: ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale'] },
      { name: 'Arkansas', cities: ['Little Rock', 'Fayetteville', 'Fort Smith'] },
      { name: 'California', cities: ['Los Angeles', 'San Francisco', 'Santa Monica', 'San Diego', 'San Jose', 'Sacramento', 'Oakland'] },
      { name: 'Colorado', cities: ['Denver', 'Colorado Springs', 'Boulder', 'Aurora'] },
      { name: 'Connecticut', cities: ['Hartford', 'New Haven', 'Stamford', 'Bridgeport'] },
      { name: 'Delaware', cities: ['Wilmington', 'Dover', 'Newark'] },
      { name: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'] },
      { name: 'Georgia', cities: ['Atlanta', 'Savannah', 'Augusta', 'Athens'] },
      { name: 'Hawaii', cities: ['Honolulu', 'Hilo', 'Maui'] },
      { name: 'Idaho', cities: ['Boise', 'Idaho Falls', 'Meridian'] },
      { name: 'Illinois', cities: ['Chicago', 'Springfield', 'Peoria', 'Rockford'] },
      { name: 'Indiana', cities: ['Indianapolis', 'Fort Wayne', 'Bloomington', 'South Bend'] },
      { name: 'Iowa', cities: ['Des Moines', 'Cedar Rapids', 'Iowa City'] },
      { name: 'Kansas', cities: ['Wichita', 'Kansas City', 'Topeka'] },
      { name: 'Kentucky', cities: ['Louisville', 'Lexington', 'Bowling Green'] },
      { name: 'Louisiana', cities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette'] },
      { name: 'Maine', cities: ['Portland', 'Bangor', 'Augusta'] },
      { name: 'Maryland', cities: ['Baltimore', 'Annapolis', 'Bethesda', 'Silver Spring'] },
      { name: 'Massachusetts', cities: ['Boston', 'Cambridge', 'Worcester', 'Springfield'] },
      { name: 'Michigan', cities: ['Detroit', 'Grand Rapids', 'Ann Arbor', 'Lansing'] },
      { name: 'Minnesota', cities: ['Minneapolis', 'Saint Paul', 'Duluth'] },
      { name: 'Mississippi', cities: ['Jackson', 'Gulfport', 'Biloxi'] },
      { name: 'Missouri', cities: ['St. Louis', 'Kansas City', 'Springfield', 'Columbia'] },
      { name: 'Montana', cities: ['Billings', 'Missoula', 'Helena', 'Bozeman'] },
      { name: 'Nebraska', cities: ['Omaha', 'Lincoln', 'Grand Island'] },
      { name: 'Nevada', cities: ['Las Vegas', 'Reno', 'Henderson', 'Carson City'] },
      { name: 'New Hampshire', cities: ['Manchester', 'Nashua', 'Concord'] },
      { name: 'New Jersey', cities: ['Newark', 'Jersey City', 'Trenton', 'Atlantic City'] },
      { name: 'New Mexico', cities: ['Albuquerque', 'Santa Fe', 'Las Cruces'] },
      { name: 'New York', cities: ['New York', 'NYC', 'Brooklyn', 'Buffalo', 'Rochester', 'Albany', 'Syracuse'] },
      { name: 'North Carolina', cities: ['Charlotte', 'Raleigh', 'Durham', 'Greensboro', 'Asheville'] },
      { name: 'North Dakota', cities: ['Fargo', 'Bismarck', 'Grand Forks'] },
      { name: 'Ohio', cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Dayton'] },
      { name: 'Oklahoma', cities: ['Oklahoma City', 'Tulsa', 'Norman'] },
      { name: 'Oregon', cities: ['Portland', 'Eugene', 'Salem', 'Bend'] },
      { name: 'Pennsylvania', cities: ['Philadelphia', 'Pittsburgh', 'Harrisburg', 'Allentown'] },
      { name: 'Rhode Island', cities: ['Providence', 'Warwick', 'Newport'] },
      { name: 'South Carolina', cities: ['Charleston', 'Columbia', 'Greenville', 'Myrtle Beach'] },
      { name: 'South Dakota', cities: ['Sioux Falls', 'Rapid City', 'Pierre'] },
      { name: 'Tennessee', cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga'] },
      { name: 'Texas', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso'] },
      { name: 'Utah', cities: ['Salt Lake City', 'Provo', 'Ogden'] },
      { name: 'Vermont', cities: ['Burlington', 'Montpelier', 'Rutland'] },
      { name: 'Virginia', cities: ['Richmond', 'Virginia Beach', 'Norfolk', 'Arlington', 'Alexandria'] },
      { name: 'Washington', cities: ['Seattle', 'Spokane', 'Tacoma', 'Olympia'] },
      { name: 'West Virginia', cities: ['Charleston', 'Morgantown', 'Huntington'] },
      { name: 'Wisconsin', cities: ['Milwaukee', 'Madison', 'Green Bay'] },
      { name: 'Wyoming', cities: ['Cheyenne', 'Casper', 'Laramie'] }
    ]
  },

  'UK': {
    label: 'Countries',
    divisions: [
      { name: 'England', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds', 'Bristol', 'Sheffield', 'Newcastle', 'Oxford', 'Brighton'] },
      { name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'] },
      { name: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport', 'Bangor'] },
      { name: 'Northern Ireland', cities: ['Belfast', 'Derry', 'Lisburn', 'Newry'] }
    ]
  },

  'Canada': {
    label: 'Provinces & Territories',
    divisions: [
      { name: 'Alberta', cities: ['Calgary', 'Edmonton', 'Red Deer', 'Banff'] },
      { name: 'British Columbia', cities: ['Vancouver', 'Victoria', 'Kelowna', 'Surrey'] },
      { name: 'Manitoba', cities: ['Winnipeg', 'Brandon'] },
      { name: 'New Brunswick', cities: ['Moncton', 'Fredericton', 'Saint John'] },
      { name: 'Newfoundland and Labrador', cities: ['St. John\'s', 'Corner Brook'] },
      { name: 'Nova Scotia', cities: ['Halifax', 'Sydney'] },
      { name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Hamilton', 'London', 'Mississauga', 'Windsor'] },
      { name: 'Prince Edward Island', cities: ['Charlottetown', 'Summerside'] },
      { name: 'Quebec', cities: ['Montreal', 'Montréal', 'Quebec City', 'Laval', 'Gatineau'] },
      { name: 'Saskatchewan', cities: ['Saskatoon', 'Regina'] },
      { name: 'Northwest Territories', cities: ['Yellowknife'] },
      { name: 'Nunavut', cities: ['Iqaluit'] },
      { name: 'Yukon', cities: ['Whitehorse'] }
    ]
  },

  'Australia': {
    label: 'States & Territories',
    divisions: [
      { name: 'New South Wales', cities: ['Sydney', 'Newcastle', 'Wollongong', 'Byron Bay'] },
      { name: 'Victoria', cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'] },
      { name: 'Queensland', cities: ['Brisbane', 'Gold Coast', 'Cairns', 'Townsville', 'Sunshine Coast'] },
      { name: 'Western Australia', cities: ['Perth', 'Fremantle', 'Broome'] },
      { name: 'South Australia', cities: ['Adelaide', 'Mount Gambier'] },
      { name: 'Tasmania', cities: ['Hobart', 'Launceston'] },
      { name: 'Australian Capital Territory', cities: ['Canberra'] },
      { name: 'Northern Territory', cities: ['Darwin', 'Alice Springs'] }
    ]
  },

  'Germany': {
    label: 'States',
    divisions: [
      { name: 'Baden-Württemberg', cities: ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg', 'Heidelberg'] },
      { name: 'Bavaria', cities: ['Munich', 'München', 'Nuremberg', 'Nürnberg', 'Augsburg', 'Regensburg'] },
      { name: 'Berlin', cities: ['Berlin'] },
      { name: 'Brandenburg', cities: ['Potsdam', 'Cottbus', 'Frankfurt (Oder)'] },
      { name: 'Bremen', cities: ['Bremen', 'Bremerhaven'] },
      { name: 'Hamburg', cities: ['Hamburg'] },
      { name: 'Hesse', cities: ['Frankfurt', 'Wiesbaden', 'Kassel', 'Darmstadt'] },
      { name: 'Lower Saxony', cities: ['Hanover', 'Hannover', 'Braunschweig', 'Osnabrück', 'Göttingen'] },
      { name: 'Mecklenburg-Vorpommern', cities: ['Rostock', 'Schwerin', 'Stralsund'] },
      { name: 'North Rhine-Westphalia', cities: ['Cologne', 'Köln', 'Düsseldorf', 'Dortmund', 'Essen', 'Bonn', 'Münster'] },
      { name: 'Rhineland-Palatinate', cities: ['Mainz', 'Koblenz', 'Trier', 'Ludwigshafen'] },
      { name: 'Saarland', cities: ['Saarbrücken'] },
      { name: 'Saxony', cities: ['Dresden', 'Leipzig', 'Chemnitz'] },
      { name: 'Saxony-Anhalt', cities: ['Magdeburg', 'Halle'] },
      { name: 'Schleswig-Holstein', cities: ['Kiel', 'Lübeck', 'Flensburg'] },
      { name: 'Thuringia', cities: ['Erfurt', 'Jena', 'Weimar'] }
    ]
  },

  'France': {
    label: 'Regions',
    divisions: [
      { name: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenoble', 'Clermont-Ferrand', 'Annecy'] },
      { name: 'Bourgogne-Franche-Comté', cities: ['Dijon', 'Besançon'] },
      { name: 'Brittany', cities: ['Rennes', 'Brest', 'Quimper'] },
      { name: 'Centre-Val de Loire', cities: ['Orléans', 'Tours', 'Bourges'] },
      { name: 'Corsica', cities: ['Ajaccio', 'Bastia'] },
      { name: 'Grand Est', cities: ['Strasbourg', 'Reims', 'Metz', 'Nancy'] },
      { name: 'Hauts-de-France', cities: ['Lille', 'Amiens', 'Calais'] },
      { name: 'Île-de-France', cities: ['Paris', 'Versailles', 'Boulogne-Billancourt'] },
      { name: 'Normandy', cities: ['Rouen', 'Caen', 'Le Havre'] },
      { name: 'Nouvelle-Aquitaine', cities: ['Bordeaux', 'Limoges', 'Poitiers', 'Biarritz'] },
      { name: 'Occitanie', cities: ['Toulouse', 'Montpellier', 'Nîmes', 'Perpignan'] },
      { name: 'Pays de la Loire', cities: ['Nantes', 'Angers', 'Le Mans'] },
      { name: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice', 'Toulon', 'Cannes', 'Avignon'] },
      { name: 'French Guiana', cities: ['Cayenne'] },
      { name: 'Guadeloupe', cities: ['Pointe-à-Pitre', 'Basse-Terre'] },
      { name: 'Martinique', cities: ['Fort-de-France'] },
      { name: 'Mayotte', cities: ['Mamoudzou'] },
      { name: 'Réunion', cities: ['Saint-Denis', 'Saint-Pierre'] }
    ]
  },

  'Brazil': {
    label: 'States & DF',
    divisions: [
      { name: 'Acre', cities: ['Rio Branco'] },
      { name: 'Alagoas', cities: ['Maceió'] },
      { name: 'Amapá', cities: ['Macapá'] },
      { name: 'Amazonas', cities: ['Manaus'] },
      { name: 'Bahia', cities: ['Salvador', 'Feira de Santana'] },
      { name: 'Ceará', cities: ['Fortaleza'] },
      { name: 'Distrito Federal', cities: ['Brasília', 'Brasilia'] },
      { name: 'Espírito Santo', cities: ['Vitória', 'Vila Velha'] },
      { name: 'Goiás', cities: ['Goiânia'] },
      { name: 'Maranhão', cities: ['São Luís'] },
      { name: 'Mato Grosso', cities: ['Cuiabá'] },
      { name: 'Mato Grosso do Sul', cities: ['Campo Grande'] },
      { name: 'Minas Gerais', cities: ['Belo Horizonte', 'Uberlândia'] },
      { name: 'Pará', cities: ['Belém'] },
      { name: 'Paraíba', cities: ['João Pessoa'] },
      { name: 'Paraná', cities: ['Curitiba', 'Londrina'] },
      { name: 'Pernambuco', cities: ['Recife', 'Olinda'] },
      { name: 'Piauí', cities: ['Teresina'] },
      { name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'Niterói'] },
      { name: 'Rio Grande do Norte', cities: ['Natal'] },
      { name: 'Rio Grande do Sul', cities: ['Porto Alegre', 'Caxias do Sul'] },
      { name: 'Rondônia', cities: ['Porto Velho'] },
      { name: 'Roraima', cities: ['Boa Vista'] },
      { name: 'Santa Catarina', cities: ['Florianópolis', 'Joinville'] },
      { name: 'São Paulo', cities: ['São Paulo', 'Sao Paulo', 'Campinas', 'Santos'] },
      { name: 'Sergipe', cities: ['Aracaju'] },
      { name: 'Tocantins', cities: ['Palmas'] }
    ]
  },

  'Japan': {
    label: 'Prefectures',
    divisions: [
      { name: 'Hokkaido', cities: ['Sapporo', 'Hakodate', 'Asahikawa'] },
      { name: 'Aomori', cities: ['Aomori', 'Hirosaki'] },
      { name: 'Iwate', cities: ['Morioka'] },
      { name: 'Miyagi', cities: ['Sendai'] },
      { name: 'Akita', cities: ['Akita'] },
      { name: 'Yamagata', cities: ['Yamagata'] },
      { name: 'Fukushima', cities: ['Fukushima', 'Koriyama'] },
      { name: 'Ibaraki', cities: ['Mito', 'Tsukuba'] },
      { name: 'Tochigi', cities: ['Utsunomiya'] },
      { name: 'Gunma', cities: ['Maebashi', 'Takasaki'] },
      { name: 'Saitama', cities: ['Saitama', 'Kawagoe'] },
      { name: 'Chiba', cities: ['Chiba', 'Funabashi'] },
      { name: 'Tokyo', cities: ['Tokyo', 'Shibuya', 'Shinjuku'] },
      { name: 'Kanagawa', cities: ['Yokohama', 'Kawasaki', 'Kamakura'] },
      { name: 'Niigata', cities: ['Niigata'] },
      { name: 'Toyama', cities: ['Toyama'] },
      { name: 'Ishikawa', cities: ['Kanazawa'] },
      { name: 'Fukui', cities: ['Fukui'] },
      { name: 'Yamanashi', cities: ['Kofu'] },
      { name: 'Nagano', cities: ['Nagano', 'Matsumoto'] },
      { name: 'Gifu', cities: ['Gifu'] },
      { name: 'Shizuoka', cities: ['Shizuoka', 'Hamamatsu'] },
      { name: 'Aichi', cities: ['Nagoya', 'Toyota'] },
      { name: 'Mie', cities: ['Tsu', 'Yokkaichi'] },
      { name: 'Shiga', cities: ['Otsu'] },
      { name: 'Kyoto', cities: ['Kyoto'] },
      { name: 'Osaka', cities: ['Osaka', 'Sakai'] },
      { name: 'Hyogo', cities: ['Kobe', 'Himeji'] },
      { name: 'Nara', cities: ['Nara'] },
      { name: 'Wakayama', cities: ['Wakayama'] },
      { name: 'Tottori', cities: ['Tottori'] },
      { name: 'Shimane', cities: ['Matsue'] },
      { name: 'Okayama', cities: ['Okayama'] },
      { name: 'Hiroshima', cities: ['Hiroshima'] },
      { name: 'Yamaguchi', cities: ['Yamaguchi', 'Shimonoseki'] },
      { name: 'Tokushima', cities: ['Tokushima'] },
      { name: 'Kagawa', cities: ['Takamatsu'] },
      { name: 'Ehime', cities: ['Matsuyama'] },
      { name: 'Kochi', cities: ['Kochi'] },
      { name: 'Fukuoka', cities: ['Fukuoka', 'Kitakyushu'] },
      { name: 'Saga', cities: ['Saga'] },
      { name: 'Nagasaki', cities: ['Nagasaki'] },
      { name: 'Kumamoto', cities: ['Kumamoto'] },
      { name: 'Oita', cities: ['Oita', 'Beppu'] },
      { name: 'Miyazaki', cities: ['Miyazaki'] },
      { name: 'Kagoshima', cities: ['Kagoshima'] },
      { name: 'Okinawa', cities: ['Naha', 'Okinawa'] }
    ]
  },

  'UAE': {
    label: 'Emirates',
    divisions: [
      { name: 'Abu Dhabi', cities: ['Abu Dhabi', 'Al Ain'] },
      { name: 'Ajman', cities: ['Ajman'] },
      { name: 'Dubai', cities: ['Dubai'] },
      { name: 'Fujairah', cities: ['Fujairah'] },
      { name: 'Ras Al Khaimah', cities: ['Ras Al Khaimah'] },
      { name: 'Sharjah', cities: ['Sharjah'] },
      { name: 'Umm Al Quwain', cities: ['Umm Al Quwain'] }
    ]
  },

  'Singapore': {
    label: 'Regions',
    divisions: [
      { name: 'Central Region', cities: ['Singapore', 'Marina Bay', 'Orchard'] },
      { name: 'East Region', cities: ['Tampines', 'Bedok', 'Changi'] },
      { name: 'North Region', cities: ['Woodlands', 'Yishun'] },
      { name: 'North-East Region', cities: ['Hougang', 'Sengkang', 'Punggol'] },
      { name: 'West Region', cities: ['Jurong', 'Clementi'] }
    ]
  },

  'Italy': {
    label: 'Regions',
    divisions: [
      { name: 'Abruzzo', cities: ['L\'Aquila', 'Pescara'] },
      { name: 'Aosta Valley', cities: ['Aosta'] },
      { name: 'Apulia', cities: ['Bari', 'Lecce', 'Taranto'] },
      { name: 'Basilicata', cities: ['Potenza', 'Matera'] },
      { name: 'Calabria', cities: ['Reggio Calabria', 'Catanzaro'] },
      { name: 'Campania', cities: ['Naples', 'Napoli', 'Salerno'] },
      { name: 'Emilia-Romagna', cities: ['Bologna', 'Parma', 'Modena', 'Rimini'] },
      { name: 'Friuli Venezia Giulia', cities: ['Trieste', 'Udine'] },
      { name: 'Lazio', cities: ['Rome', 'Roma', 'Latina'] },
      { name: 'Liguria', cities: ['Genoa', 'Genova', 'Sanremo'] },
      { name: 'Lombardy', cities: ['Milan', 'Milano', 'Bergamo', 'Brescia'] },
      { name: 'Marche', cities: ['Ancona', 'Pesaro'] },
      { name: 'Molise', cities: ['Campobasso'] },
      { name: 'Piedmont', cities: ['Turin', 'Torino'] },
      { name: 'Sardinia', cities: ['Cagliari', 'Sassari'] },
      { name: 'Sicily', cities: ['Palermo', 'Catania', 'Messina'] },
      { name: 'Trentino-South Tyrol', cities: ['Trento', 'Bolzano'] },
      { name: 'Tuscany', cities: ['Florence', 'Firenze', 'Pisa', 'Siena'] },
      { name: 'Umbria', cities: ['Perugia', 'Terni'] },
      { name: 'Veneto', cities: ['Venice', 'Venezia', 'Verona', 'Padua'] }
    ]
  },

  'Spain': {
    label: 'Communities',
    divisions: [
      { name: 'Andalusia', cities: ['Seville', 'Sevilla', 'Málaga', 'Granada', 'Córdoba'] },
      { name: 'Aragon', cities: ['Zaragoza', 'Huesca'] },
      { name: 'Asturias', cities: ['Oviedo', 'Gijón'] },
      { name: 'Balearic Islands', cities: ['Ibiza', 'Palma', 'Mallorca'] },
      { name: 'Basque Country', cities: ['Bilbao', 'San Sebastián', 'Vitoria-Gasteiz'] },
      { name: 'Canary Islands', cities: ['Las Palmas', 'Santa Cruz de Tenerife'] },
      { name: 'Cantabria', cities: ['Santander'] },
      { name: 'Castile and León', cities: ['Valladolid', 'Salamanca', 'Burgos', 'León'] },
      { name: 'Castilla-La Mancha', cities: ['Toledo', 'Albacete'] },
      { name: 'Catalonia', cities: ['Barcelona', 'Girona', 'Tarragona'] },
      { name: 'Extremadura', cities: ['Mérida', 'Badajoz'] },
      { name: 'Galicia', cities: ['Santiago de Compostela', 'A Coruña', 'Vigo'] },
      { name: 'La Rioja', cities: ['Logroño'] },
      { name: 'Madrid', cities: ['Madrid'] },
      { name: 'Murcia', cities: ['Murcia', 'Cartagena'] },
      { name: 'Navarre', cities: ['Pamplona'] },
      { name: 'Valencia', cities: ['Valencia', 'Alicante'] },
      { name: 'Ceuta', cities: ['Ceuta'] },
      { name: 'Melilla', cities: ['Melilla'] }
    ]
  },

  'Russia': {
    label: 'Federal Subjects',
    divisions: [
      'Moscow', 'Saint Petersburg', 'Moscow Oblast', 'Leningrad Oblast', 'Krasnodar Krai', 'Sverdlovsk Oblast',
      'Rostov Oblast', 'Tatarstan', 'Bashkortostan', 'Chelyabinsk Oblast', 'Samara Oblast', 'Nizhny Novgorod Oblast',
      'Novosibirsk Oblast', 'Krasnoyarsk Krai', 'Perm Krai', 'Voronezh Oblast', 'Volgograd Oblast', 'Saratov Oblast',
      'Tyumen Oblast', 'Omsk Oblast', 'Irkutsk Oblast', 'Primorsky Krai', 'Khabarovsk Krai', 'Kaliningrad Oblast',
      'Yaroslavl Oblast', 'Tula Oblast', 'Altai Krai', 'Stavropol Krai', 'Dagestan', 'Chechnya',
      'Karelia', 'Komi', 'Sakha', 'Buryatia', 'Chuvashia', 'Udmurtia', 'Mordovia', 'Mari El',
      'North Ossetia-Alania', 'Kabardino-Balkaria', 'Karachay-Cherkessia', 'Ingushetia', 'Kalmykia', 'Adygea',
      'Tuva', 'Khakassia', 'Altai Republic', 'Kamchatka Krai', 'Zabaykalsky Krai', 'Amur Oblast',
      'Arkhangelsk Oblast', 'Astrakhan Oblast', 'Belgorod Oblast', 'Bryansk Oblast', 'Vladimir Oblast',
      'Vologda Oblast', 'Ivanovo Oblast', 'Kaluga Oblast', 'Kemerovo Oblast', 'Kirov Oblast',
      'Kostroma Oblast', 'Kurgan Oblast', 'Kursk Oblast', 'Lipetsk Oblast', 'Magadan Oblast',
      'Murmansk Oblast', 'Novgorod Oblast', 'Orenburg Oblast', 'Oryol Oblast', 'Penza Oblast',
      'Pskov Oblast', 'Ryazan Oblast', 'Sakhalin Oblast', 'Smolensk Oblast', 'Tambov Oblast',
      'Tver Oblast', 'Tomsk Oblast', 'Ulyanovsk Oblast', 'Jewish Autonomous Oblast', 'Nenets Autonomous Okrug',
      'Khanty-Mansi Autonomous Okrug', 'Yamalo-Nenets Autonomous Okrug', 'Chukotka Autonomous Okrug'
    ].map(n => ({
      name: n,
      cities: n === 'Saint Petersburg' ? ['St. Petersburg', 'Saint Petersburg'] : [n.replace(/ (Oblast|Krai|Republic)$/, '')]
    }))
  },

  'South Korea': {
    label: 'Divisions',
    divisions: [
      { name: 'Seoul', cities: ['Seoul'] },
      { name: 'Busan', cities: ['Busan'] },
      { name: 'Daegu', cities: ['Daegu'] },
      { name: 'Incheon', cities: ['Incheon'] },
      { name: 'Gwangju', cities: ['Gwangju'] },
      { name: 'Daejeon', cities: ['Daejeon'] },
      { name: 'Ulsan', cities: ['Ulsan'] },
      { name: 'Sejong', cities: ['Sejong'] },
      { name: 'Gyeonggi', cities: ['Suwon', 'Seongnam', 'Goyang'] },
      { name: 'Gangwon', cities: ['Chuncheon', 'Gangneung'] },
      { name: 'North Chungcheong', cities: ['Cheongju'] },
      { name: 'South Chungcheong', cities: ['Cheonan', 'Asan'] },
      { name: 'Jeonbuk', cities: ['Jeonju'] },
      { name: 'South Jeolla', cities: ['Mokpo', 'Yeosu'] },
      { name: 'North Gyeongsang', cities: ['Pohang', 'Gumi'] },
      { name: 'South Gyeongsang', cities: ['Changwon', 'Gimhae'] },
      { name: 'Jeju', cities: ['Jeju'] }
    ]
  },

  'Mexico': {
    label: 'States & CDMX',
    divisions: [
      'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
      'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico City',
      'State of Mexico', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
      'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
      'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
    ].map(n => ({
      name: n,
      cities: n === 'Jalisco' ? ['Guadalajara'] : n === 'Nuevo León' ? ['Monterrey'] : n === 'Mexico City' ? ['Mexico City', 'CDMX'] : [n]
    }))
  },

  'Argentina': {
    label: 'Provinces & CABA',
    divisions: [
      'Buenos Aires', 'Buenos Aires Province', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes',
      'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén',
      'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
      'Tierra del Fuego', 'Tucumán'
    ].map(n => ({ name: n, cities: n === 'Santa Fe' ? ['Rosario', 'Santa Fe'] : [n] }))
  },

  'South Africa': {
    label: 'Provinces',
    divisions: [
      { name: 'Eastern Cape', cities: ['Gqeberha', 'Port Elizabeth', 'East London'] },
      { name: 'Free State', cities: ['Bloemfontein'] },
      { name: 'Gauteng', cities: ['Johannesburg', 'Pretoria', 'Soweto'] },
      { name: 'KwaZulu-Natal', cities: ['Durban', 'Pietermaritzburg'] },
      { name: 'Limpopo', cities: ['Polokwane'] },
      { name: 'Mpumalanga', cities: ['Mbombela', 'Nelspruit'] },
      { name: 'North West', cities: ['Mahikeng', 'Rustenburg'] },
      { name: 'Northern Cape', cities: ['Kimberley'] },
      { name: 'Western Cape', cities: ['Cape Town', 'Stellenbosch'] }
    ]
  },

  'Turkey': {
    label: 'Provinces',
    divisions: [
      'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan',
      'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis',
      'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce',
      'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkâri',
      'Hatay', 'Iğdır', 'Isparta', 'Istanbul', 'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars',
      'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya',
      'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
      'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat',
      'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Netherlands': {
    label: 'Provinces',
    divisions: [
      { name: 'Drenthe', cities: ['Assen', 'Emmen'] },
      { name: 'Flevoland', cities: ['Almere', 'Lelystad'] },
      { name: 'Friesland', cities: ['Leeuwarden'] },
      { name: 'Gelderland', cities: ['Arnhem', 'Nijmegen'] },
      { name: 'Groningen', cities: ['Groningen'] },
      { name: 'Limburg', cities: ['Maastricht', 'Venlo'] },
      { name: 'North Brabant', cities: ['Eindhoven', 'Tilburg', 'Breda'] },
      { name: 'North Holland', cities: ['Amsterdam', 'Haarlem', 'Hilversum'] },
      { name: 'Overijssel', cities: ['Zwolle', 'Enschede'] },
      { name: 'South Holland', cities: ['Rotterdam', 'The Hague', 'Leiden'] },
      { name: 'Utrecht', cities: ['Utrecht', 'Amersfoort'] },
      { name: 'Zeeland', cities: ['Middelburg'] }
    ]
  },

  'Egypt': {
    label: 'Governorates',
    divisions: [
      'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia', 'Damietta',
      'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matrouh', 'Minya',
      'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea',
      'Sharqia', 'Sohag', 'South Sinai', 'Suez'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Pakistan': {
    label: 'Regions',
    divisions: [
      { name: 'Punjab', cities: ['Lahore', 'Rawalpindi', 'Faisalabad', 'Multan'] },
      { name: 'Sindh', cities: ['Karachi', 'Hyderabad', 'Sukkur'] },
      { name: 'Khyber Pakhtunkhwa', cities: ['Peshawar', 'Abbottabad', 'Swat'] },
      { name: 'Balochistan', cities: ['Quetta', 'Gwadar'] },
      { name: 'Islamabad', cities: ['Islamabad'] },
      { name: 'Azad Kashmir', cities: ['Muzaffarabad', 'Mirpur'] },
      { name: 'Gilgit-Baltistan', cities: ['Gilgit', 'Skardu'] }
    ]
  },

  'Bangladesh': {
    label: 'Divisions',
    divisions: [
      { name: 'Barishal', cities: ['Barishal'] },
      { name: 'Chattogram', cities: ['Chattogram', 'Chittagong', 'Cox\'s Bazar'] },
      { name: 'Dhaka', cities: ['Dhaka', 'Gazipur', 'Narayanganj'] },
      { name: 'Khulna', cities: ['Khulna', 'Jessore'] },
      { name: 'Mymensingh', cities: ['Mymensingh'] },
      { name: 'Rajshahi', cities: ['Rajshahi', 'Bogra'] },
      { name: 'Rangpur', cities: ['Rangpur'] },
      { name: 'Sylhet', cities: ['Sylhet'] }
    ]
  },

  'Sri Lanka': {
    label: 'Provinces',
    divisions: [
      { name: 'Central', cities: ['Kandy', 'Nuwara Eliya'] },
      { name: 'Eastern', cities: ['Trincomalee', 'Batticaloa'] },
      { name: 'North Central', cities: ['Anuradhapura'] },
      { name: 'North Western', cities: ['Kurunegala'] },
      { name: 'Northern', cities: ['Jaffna'] },
      { name: 'Sabaragamuwa', cities: ['Ratnapura'] },
      { name: 'Southern', cities: ['Galle', 'Matara'] },
      { name: 'Uva', cities: ['Badulla'] },
      { name: 'Western', cities: ['Colombo', 'Negombo'] }
    ]
  },

  'Nepal': {
    label: 'Provinces',
    divisions: [
      { name: 'Koshi', cities: ['Biratnagar', 'Dharan'] },
      { name: 'Madhesh', cities: ['Janakpur', 'Birgunj'] },
      { name: 'Bagmati', cities: ['Kathmandu', 'Lalitpur', 'Bhaktapur'] },
      { name: 'Gandaki', cities: ['Pokhara'] },
      { name: 'Lumbini', cities: ['Butwal', 'Nepalgunj'] },
      { name: 'Karnali', cities: ['Birendranagar'] },
      { name: 'Sudurpashchim', cities: ['Dhangadhi'] }
    ]
  },

  'China': {
    label: 'Provinces & Regions',
    divisions: [
      'Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou',
      'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu',
      'Jiangxi', 'Jilin', 'Liaoning', 'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai',
      'Shanxi', 'Sichuan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang'
    ].map(n => ({
      name: n,
      cities: n === 'Guangdong' ? ['Guangzhou', 'Shenzhen'] : n === 'Sichuan' ? ['Chengdu'] : n === 'Zhejiang' ? ['Hangzhou'] : n === 'Jiangsu' ? ['Nanjing', 'Suzhou'] : [n]
    }))
  },

  'Indonesia': {
    label: 'Provinces',
    divisions: [
      'Aceh', 'Bali', 'Bangka Belitung Islands', 'Banten', 'Bengkulu', 'Central Java', 'Central Kalimantan',
      'Central Papua', 'Central Sulawesi', 'East Java', 'East Kalimantan', 'East Nusa Tenggara', 'Gorontalo',
      'Highland Papua', 'Jakarta', 'Jambi', 'Lampung', 'Maluku', 'North Kalimantan', 'North Maluku',
      'North Sulawesi', 'North Sumatra', 'Papua', 'Riau', 'Riau Islands', 'South Kalimantan',
      'South Papua', 'South Sulawesi', 'South Sumatra', 'Southeast Sulawesi', 'Southwest Papua',
      'West Java', 'West Kalimantan', 'West Nusa Tenggara', 'West Papua', 'West Sulawesi',
      'West Sumatra', 'Yogyakarta'
    ].map(n => ({
      name: n,
      cities: n === 'West Java' ? ['Bandung'] : n === 'East Java' ? ['Surabaya'] : n === 'North Sumatra' ? ['Medan'] : [n]
    }))
  },

  'Malaysia': {
    label: 'States & FT',
    divisions: [
      'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Malacca', 'Negeri Sembilan',
      'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Philippines': {
    label: 'Regions',
    divisions: [
      { name: 'Metro Manila (NCR)', cities: ['Manila', 'Quezon City', 'Makati'] },
      { name: 'Cordillera (CAR)', cities: ['Baguio'] },
      { name: 'Ilocos Region', cities: ['Vigan', 'Laoag'] },
      { name: 'Cagayan Valley', cities: ['Tuguegarao'] },
      { name: 'Central Luzon', cities: ['Angeles', 'San Fernando'] },
      { name: 'Calabarzon', cities: ['Calamba', 'Tagaytay'] },
      { name: 'Mimaropa', cities: ['Puerto Princesa'] },
      { name: 'Bicol Region', cities: ['Legazpi', 'Naga'] },
      { name: 'Western Visayas', cities: ['Iloilo'] },
      { name: 'Negros Island Region', cities: ['Bacolod', 'Dumaguete'] },
      { name: 'Central Visayas', cities: ['Cebu'] },
      { name: 'Eastern Visayas', cities: ['Tacloban'] },
      { name: 'Zamboanga Peninsula', cities: ['Zamboanga'] },
      { name: 'Northern Mindanao', cities: ['Cagayan de Oro'] },
      { name: 'Davao Region', cities: ['Davao'] },
      { name: 'Soccsksargen', cities: ['General Santos'] },
      { name: 'Caraga', cities: ['Butuan'] },
      { name: 'Bangsamoro', cities: ['Cotabato'] }
    ]
  },

  'Thailand': {
    label: 'Provinces',
    divisions: [
      'Bangkok', 'Amnat Charoen', 'Ang Thong', 'Bueng Kan', 'Buriram', 'Chachoengsao', 'Chai Nat', 'Chaiyaphum',
      'Chanthaburi', 'Chiang Mai', 'Chiang Rai', 'Chonburi', 'Chumphon', 'Kalasin', 'Kamphaeng Phet',
      'Kanchanaburi', 'Khon Kaen', 'Krabi', 'Lampang', 'Lamphun', 'Loei', 'Lopburi', 'Mae Hong Son',
      'Maha Sarakham', 'Mukdahan', 'Nakhon Nayok', 'Nakhon Pathom', 'Nakhon Phanom', 'Nakhon Ratchasima',
      'Nakhon Sawan', 'Nakhon Si Thammarat', 'Nan', 'Narathiwat', 'Nong Bua Lamphu', 'Nong Khai',
      'Nonthaburi', 'Pathum Thani', 'Pattani', 'Phang Nga', 'Phatthalung', 'Phayao', 'Phetchabun',
      'Phetchaburi', 'Phichit', 'Phitsanulok', 'Phra Nakhon Si Ayutthaya', 'Phrae', 'Phuket',
      'Prachinburi', 'Prachuap Khiri Khan', 'Ranong', 'Ratchaburi', 'Rayong', 'Roi Et', 'Sa Kaeo',
      'Sakon Nakhon', 'Samut Prakan', 'Samut Sakhon', 'Samut Songkhram', 'Saraburi', 'Satun', 'Sing Buri',
      'Sisaket', 'Songkhla', 'Sukhothai', 'Suphan Buri', 'Surat Thani', 'Surin', 'Tak', 'Trang', 'Trat',
      'Ubon Ratchathani', 'Udon Thani', 'Uthai Thani', 'Uttaradit', 'Yala', 'Yasothon'
    ].map(n => ({ name: n, cities: n === 'Chonburi' ? ['Pattaya', 'Chonburi'] : [n] }))
  },

  'Vietnam': {
    label: 'Provinces & Cities',
    divisions: [
      'Hanoi', 'Ho Chi Minh City', 'Hai Phong', 'Da Nang', 'Can Tho', 'Hue',
      'An Giang', 'Bac Ninh', 'Ca Mau', 'Cao Bang', 'Dak Lak', 'Dien Bien', 'Dong Nai',
      'Dong Thap', 'Gia Lai', 'Ha Tinh', 'Hung Yen', 'Khanh Hoa', 'Lai Chau', 'Lam Dong',
      'Lang Son', 'Lao Cai', 'Nghe An', 'Ninh Binh', 'Phu Tho', 'Quang Ngai', 'Quang Ninh',
      'Quang Tri', 'Son La', 'Tay Ninh', 'Thai Nguyen', 'Thanh Hoa', 'Tuyen Quang', 'Vinh Long'
    ].map(n => ({ name: n, cities: n === 'Ho Chi Minh City' ? ['Ho Chi Minh', 'Saigon'] : [n] }))
  },

  'Nigeria': {
    label: 'States & FCT',
    divisions: [
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
      'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
      'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
      'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ].map(n => ({ name: n, cities: n === 'FCT (Abuja)' ? ['Abuja'] : n === 'Oyo' ? ['Ibadan'] : n === 'Rivers' ? ['Port Harcourt'] : [n] }))
  },

  'Kenya': {
    label: 'Counties',
    divisions: [
      'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo',
      'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui',
      'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori',
      'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri',
      'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia', 'Turkana',
      'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Ghana': {
    label: 'Regions',
    divisions: [
      'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern', 'Greater Accra', 'North East',
      'Northern', 'Oti', 'Savannah', 'Upper East', 'Upper West', 'Volta', 'Western', 'Western North'
    ].map(n => ({ name: n, cities: n === 'Greater Accra' ? ['Accra'] : n === 'Ashanti' ? ['Kumasi'] : [n] }))
  },

  'Ethiopia': {
    label: 'Regions & Cities',
    divisions: [
      'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Central Ethiopia', 'Dire Dawa', 'Gambela',
      'Harari', 'Oromia', 'Sidama', 'Somali', 'South Ethiopia', 'South West Ethiopia Peoples', 'Tigray'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Morocco': {
    label: 'Regions',
    divisions: [
      { name: 'Béni Mellal-Khénifra', cities: ['Béni Mellal'] },
      { name: 'Casablanca-Settat', cities: ['Casablanca'] },
      { name: 'Drâa-Tafilalet', cities: ['Errachidia', 'Ouarzazate'] },
      { name: 'Dakhla-Oued Ed-Dahab', cities: ['Dakhla'] },
      { name: 'Fès-Meknès', cities: ['Fez', 'Fès', 'Meknes'] },
      { name: 'Guelmim-Oued Noun', cities: ['Guelmim'] },
      { name: 'Laâyoune-Sakia El Hamra', cities: ['Laâyoune'] },
      { name: 'Marrakesh-Safi', cities: ['Marrakesh', 'Marrakech'] },
      { name: 'Oriental', cities: ['Oujda'] },
      { name: 'Rabat-Salé-Kénitra', cities: ['Rabat', 'Salé', 'Kenitra'] },
      { name: 'Souss-Massa', cities: ['Agadir'] },
      { name: 'Tanger-Tétouan-Al Hoceïma', cities: ['Tangier', 'Tétouan'] }
    ]
  },

  'Poland': {
    label: 'Voivodeships',
    divisions: [
      { name: 'Greater Poland', cities: ['Poznań'] },
      { name: 'Holy Cross', cities: ['Kielce'] },
      { name: 'Kuyavia-Pomerania', cities: ['Bydgoszcz', 'Toruń'] },
      { name: 'Lesser Poland', cities: ['Kraków', 'Krakow'] },
      { name: 'Łódź', cities: ['Łódź', 'Lodz'] },
      { name: 'Lower Silesia', cities: ['Wrocław'] },
      { name: 'Lublin', cities: ['Lublin'] },
      { name: 'Lubusz', cities: ['Zielona Góra', 'Gorzów'] },
      { name: 'Masovia', cities: ['Warsaw', 'Warszawa'] },
      { name: 'Opole', cities: ['Opole'] },
      { name: 'Podlaskie', cities: ['Białystok'] },
      { name: 'Pomerania', cities: ['Gdańsk', 'Gdynia'] },
      { name: 'Silesia', cities: ['Katowice'] },
      { name: 'Subcarpathia', cities: ['Rzeszów'] },
      { name: 'Warmia-Masuria', cities: ['Olsztyn'] },
      { name: 'West Pomerania', cities: ['Szczecin'] }
    ]
  },

  'Ukraine': {
    label: 'Regions',
    divisions: [
      'Cherkasy', 'Chernihiv', 'Chernivtsi', 'Crimea', 'Dnipropetrovsk', 'Donetsk', 'Ivano-Frankivsk',
      'Kharkiv', 'Kherson', 'Khmelnytskyi', 'Kirovohrad', 'Kyiv', 'Kyiv Oblast', 'Luhansk', 'Lviv',
      'Mykolaiv', 'Odesa', 'Poltava', 'Rivne', 'Sevastopol', 'Sumy', 'Ternopil', 'Vinnytsia',
      'Volyn', 'Zakarpattia', 'Zaporizhzhia', 'Zhytomyr'
    ].map(n => ({ name: n, cities: n === 'Dnipropetrovsk' ? ['Dnipro'] : [n.replace(' Oblast', '')] }))
  },

  'Switzerland': {
    label: 'Cantons',
    divisions: [
      'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft', 'Basel-Stadt',
      'Bern', 'Fribourg', 'Geneva', 'Glarus', 'Graubünden', 'Jura', 'Lucerne', 'Neuchâtel', 'Nidwalden',
      'Obwalden', 'Schaffhausen', 'Schwyz', 'Solothurn', 'St. Gallen', 'Thurgau', 'Ticino', 'Uri',
      'Valais', 'Vaud', 'Zug', 'Zürich'
    ].map(n => ({ name: n, cities: n === 'Vaud' ? ['Lausanne'] : n === 'Zürich' ? ['Zürich', 'Zurich'] : [n] }))
  },

  'Austria': {
    label: 'States',
    divisions: [
      'Burgenland', 'Carinthia', 'Lower Austria', 'Salzburg', 'Styria', 'Tyrol', 'Upper Austria', 'Vienna', 'Vorarlberg'
    ].map(n => ({ name: n, cities: n === 'Styria' ? ['Graz'] : n === 'Upper Austria' ? ['Linz'] : n === 'Tyrol' ? ['Innsbruck'] : [n] }))
  },

  'Belgium': {
    label: 'Provinces & Brussels',
    divisions: [
      'Antwerp', 'Brussels-Capital Region', 'East Flanders', 'Flemish Brabant', 'Hainaut',
      'Liège', 'Limburg', 'Luxembourg', 'Namur', 'Walloon Brabant', 'West Flanders'
    ].map(n => ({ name: n, cities: n === 'Brussels-Capital Region' ? ['Brussels', 'Bruxelles'] : n === 'East Flanders' ? ['Ghent'] : n === 'West Flanders' ? ['Bruges'] : [n] }))
  },

  'Sweden': {
    label: 'Counties',
    divisions: [
      'Blekinge', 'Dalarna', 'Gävleborg', 'Gotland', 'Halland', 'Jämtland', 'Jönköping', 'Kalmar',
      'Kronoberg', 'Norrbotten', 'Örebro', 'Östergötland', 'Skåne', 'Södermanland', 'Stockholm',
      'Uppsala', 'Värmland', 'Västerbotten', 'Västernorrland', 'Västmanland', 'Västra Götaland'
    ].map(n => ({ name: n, cities: n === 'Västra Götaland' ? ['Gothenburg'] : n === 'Skåne' ? ['Malmö'] : [n] }))
  },

  'Norway': {
    label: 'Counties',
    divisions: [
      'Agder', 'Akershus', 'Buskerud', 'Finnmark', 'Innlandet', 'Møre og Romsdal', 'Nordland',
      'Oslo', 'Østfold', 'Rogaland', 'Telemark', 'Troms', 'Trøndelag', 'Vestfold', 'Vestland'
    ].map(n => ({ name: n, cities: n === 'Vestland' ? ['Bergen'] : n === 'Trøndelag' ? ['Trondheim'] : n === 'Rogaland' ? ['Stavanger'] : [n] }))
  },

  'Denmark': {
    label: 'Regions',
    divisions: [
      { name: 'Capital Region of Denmark', cities: ['Copenhagen', 'København'] },
      { name: 'Central Denmark Region', cities: ['Aarhus'] },
      { name: 'North Denmark Region', cities: ['Aalborg'] },
      { name: 'Region Zealand', cities: ['Roskilde'] },
      { name: 'Region of Southern Denmark', cities: ['Odense'] }
    ]
  },

  'Finland': {
    label: 'Regions',
    divisions: [
      'Åland', 'Central Finland', 'Central Ostrobothnia', 'Kainuu', 'Kanta-Häme', 'Kymenlaakso',
      'Lapland', 'North Karelia', 'North Ostrobothnia', 'North Savo', 'Ostrobothnia', 'Päijät-Häme',
      'Pirkanmaa', 'Satakunta', 'South Karelia', 'South Ostrobothnia', 'South Savo', 'Southwest Finland', 'Uusimaa'
    ].map(n => ({ name: n, cities: n === 'Uusimaa' ? ['Helsinki'] : n === 'Pirkanmaa' ? ['Tampere'] : n === 'Southwest Finland' ? ['Turku'] : [n] }))
  },

  'Ireland': {
    label: 'Counties',
    divisions: [
      'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin', 'Galway', 'Kerry', 'Kildare', 'Kilkenny',
      'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan', 'Offaly',
      'Roscommon', 'Sligo', 'Tipperary', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Portugal': {
    label: 'Districts & Regions',
    divisions: [
      'Aveiro', 'Azores', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra', 'Évora', 'Faro',
      'Guarda', 'Leiria', 'Lisbon', 'Madeira', 'Portalegre', 'Porto', 'Santarém', 'Setúbal',
      'Viana do Castelo', 'Vila Real', 'Viseu'
    ].map(n => ({ name: n, cities: n === 'Lisbon' ? ['Lisbon', 'Lisboa'] : [n] }))
  },

  'Greece': {
    label: 'Regions',
    divisions: [
      { name: 'Attica', cities: ['Athens', 'Piraeus'] },
      { name: 'Central Greece', cities: ['Lamia'] },
      { name: 'Central Macedonia', cities: ['Thessaloniki'] },
      { name: 'Crete', cities: ['Heraklion', 'Chania'] },
      { name: 'Eastern Macedonia and Thrace', cities: ['Kavala', 'Alexandroupoli'] },
      { name: 'Epirus', cities: ['Ioannina'] },
      { name: 'Ionian Islands', cities: ['Corfu'] },
      { name: 'North Aegean', cities: ['Mytilene'] },
      { name: 'Peloponnese', cities: ['Kalamata'] },
      { name: 'South Aegean', cities: ['Rhodes'] },
      { name: 'Thessaly', cities: ['Larissa', 'Volos'] },
      { name: 'Western Greece', cities: ['Patras'] },
      { name: 'Western Macedonia', cities: ['Kozani'] }
    ]
  },

  'Romania': {
    label: 'Counties & Bucharest',
    divisions: [
      'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 'Brăila', 'Brașov',
      'Bucharest', 'Buzău', 'Călărași', 'Caraș-Severin', 'Cluj', 'Constanța', 'Covasna', 'Dâmbovița',
      'Dolj', 'Galați', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov',
      'Maramureș', 'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova', 'Sălaj', 'Satu Mare', 'Sibiu',
      'Suceava', 'Teleorman', 'Timiș', 'Tulcea', 'Vâlcea', 'Vaslui', 'Vrancea'
    ].map(n => ({ name: n, cities: n === 'Cluj' ? ['Cluj-Napoca'] : n === 'Timiș' ? ['Timișoara'] : [n] }))
  },

  'Hungary': {
    label: 'Counties & Budapest',
    divisions: [
      'Bács-Kiskun', 'Baranya', 'Békés', 'Borsod-Abaúj-Zemplén', 'Budapest', 'Csongrád-Csanád', 'Fejér',
      'Győr-Moson-Sopron', 'Hajdú-Bihar', 'Heves', 'Jász-Nagykun-Szolnok', 'Komárom-Esztergom',
      'Nógrád', 'Pest', 'Somogy', 'Szabolcs-Szatmár-Bereg', 'Tolna', 'Vas', 'Veszprém', 'Zala'
    ].map(n => ({ name: n, cities: n === 'Hajdú-Bihar' ? ['Debrecen'] : n === 'Csongrád-Csanád' ? ['Szeged'] : [n] }))
  },

  'Czech Republic': {
    label: 'Regions',
    divisions: [
      'Central Bohemian', 'Hradec Králové', 'Karlovy Vary', 'Liberec', 'Moravian-Silesian',
      'Olomouc', 'Pardubice', 'Plzeň', 'Prague', 'South Bohemian', 'South Moravian', 'Ústí nad Labem',
      'Vysočina', 'Zlín'
    ].map(n => ({ name: n, cities: n === 'South Moravian' ? ['Brno'] : n === 'Moravian-Silesian' ? ['Ostrava'] : [n] }))
  },

  'Croatia': {
    label: 'Counties & Zagreb',
    divisions: [
      'Bjelovar-Bilogora', 'Brod-Posavina', 'Dubrovnik-Neretva', 'Istria', 'Karlovac', 'Koprivnica-Križevci',
      'Krapina-Zagorje', 'Lika-Senj', 'Međimurje', 'Osijek-Baranja', 'Požega-Slavonia', 'Primorje-Gorski Kotar',
      'Šibenik-Knin', 'Sisak-Moslavina', 'Split-Dalmatia', 'Varaždin', 'Virovitica-Podravina',
      'Vukovar-Syrmia', 'Zadar', 'Zagreb', 'Zagreb County'
    ].map(n => ({ name: n, cities: [n.replace(' County', '')] }))
  },

  'Colombia': {
    label: 'Departments & Bogotá',
    divisions: [
      'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá',
      'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila',
      'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
      'San Andrés and Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
    ].map(n => ({ name: n, cities: n === 'Antioquia' ? ['Medellín'] : n === 'Valle del Cauca' ? ['Cali'] : n === 'Atlántico' ? ['Barranquilla'] : [n] }))
  },

  'Chile': {
    label: 'Regions',
    divisions: [
      'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso',
      'Santiago Metropolitan', 'O\'Higgins', 'Maule', 'Ñuble', 'Biobío', 'Araucanía',
      'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
    ].map(n => ({ name: n, cities: n === 'Santiago Metropolitan' ? ['Santiago'] : [n] }))
  },

  'Peru': {
    label: 'Regions',
    divisions: [
      'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco',
      'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto',
      'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Venezuela': {
    label: 'States & Capital',
    divisions: [
      'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Capital District', 'Carabobo',
      'Cojedes', 'Delta Amacuro', 'Falcón', 'Guárico', 'La Guaira', 'Lara', 'Mérida', 'Miranda',
      'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre', 'Táchira', 'Trujillo', 'Yaracuy', 'Zulia'
    ].map(n => ({ name: n, cities: n === 'Capital District' ? ['Caracas'] : n === 'Zulia' ? ['Maracaibo'] : [n] }))
  },

  'Bolivia': {
    label: 'Departments',
    divisions: [
      'Beni', 'Chuquisaca', 'Cochabamba', 'La Paz', 'Oruro', 'Pando', 'Potosí', 'Santa Cruz', 'Tarija'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Cuba': {
    label: 'Provinces',
    divisions: [
      'Artemisa', 'Camagüey', 'Ciego de Ávila', 'Cienfuegos', 'Granma', 'Guantánamo', 'Havana',
      'Holguín', 'Isla de la Juventud', 'Las Tunas', 'Matanzas', 'Mayabeque', 'Pinar del Río',
      'Sancti Spíritus', 'Santiago de Cuba', 'Villa Clara'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Jamaica': {
    label: 'Parishes',
    divisions: [
      'Clarendon', 'Hanover', 'Kingston', 'Manchester', 'Portland', 'Saint Andrew', 'Saint Ann',
      'Saint Catherine', 'Saint Elizabeth', 'Saint James', 'Saint Mary', 'Saint Thomas', 'Trelawny', 'Westmoreland'
    ].map(n => ({ name: n, cities: n === 'Saint Ann' ? ['Ocho Rios', 'St. Ann'] : n === 'Saint James' ? ['Montego Bay'] : [n] }))
  },

  'New Zealand': {
    label: 'Regions',
    divisions: [
      'Auckland', 'Bay of Plenty', 'Canterbury', 'Gisborne', 'Hawke\'s Bay', 'Manawatū-Whanganui',
      'Marlborough', 'Nelson', 'Northland', 'Otago', 'Southland', 'Taranaki', 'Tasman', 'Waikato',
      'Wellington', 'West Coast'
    ].map(n => ({ name: n, cities: n === 'Canterbury' ? ['Christchurch'] : [n] }))
  },

  'Saudi Arabia': {
    label: 'Regions',
    divisions: [
      'Al-Bahah', 'Al-Jawf', 'Al-Qassim', 'Asir', 'Eastern Province', 'Ha\'il', 'Jazan',
      'Madinah', 'Makkah', 'Najran', 'Northern Borders', 'Riyadh', 'Tabuk'
    ].map(n => ({ name: n, cities: n === 'Makkah' ? ['Mecca', 'Jeddah', 'Makkah'] : n === 'Eastern Province' ? ['Dammam', 'Khobar'] : [n] }))
  },

  'Iran': {
    label: 'Provinces',
    divisions: [
      'Alborz', 'Ardabil', 'Bushehr', 'Chaharmahal and Bakhtiari', 'East Azerbaijan', 'Fars', 'Gilan',
      'Golestan', 'Hamadan', 'Hormozgan', 'Ilam', 'Isfahan', 'Kerman', 'Kermanshah', 'Khuzestan',
      'Kohgiluyeh and Boyer-Ahmad', 'Kurdistan', 'Lorestan', 'Markazi', 'Mazandaran', 'North Khorasan',
      'Qazvin', 'Qom', 'Razavi Khorasan', 'Semnan', 'Sistan and Baluchestan', 'South Khorasan',
      'Tehran', 'West Azerbaijan', 'Yazd', 'Zanjan'
    ].map(n => ({ name: n, cities: n === 'Fars' ? ['Shiraz'] : n === 'Razavi Khorasan' ? ['Mashhad'] : [n] }))
  },

  'Iraq': {
    label: 'Governorates',
    divisions: [
      'Al Anbar', 'Al-Qādisiyyah', 'Babil', 'Baghdad', 'Basra', 'Dhi Qar', 'Diyala', 'Dohuk',
      'Erbil', 'Halabja', 'Karbala', 'Kirkuk', 'Maysan', 'Muthanna', 'Najaf', 'Nineveh',
      'Saladin', 'Sulaymaniyah', 'Wasit'
    ].map(n => ({ name: n, cities: n === 'Nineveh' ? ['Mosul'] : [n] }))
  },

  'Israel': {
    label: 'Districts',
    divisions: [
      { name: 'Central District', cities: ['Rishon LeZion', 'Petah Tikva', 'Netanya'] },
      { name: 'Haifa District', cities: ['Haifa'] },
      { name: 'Jerusalem District', cities: ['Jerusalem'] },
      { name: 'Northern District', cities: ['Nazareth', 'Tiberias'] },
      { name: 'Southern District', cities: ['Beersheba', 'Eilat', 'Ashdod'] },
      { name: 'Tel Aviv District', cities: ['Tel Aviv'] }
    ]
  },

  'Jordan': {
    label: 'Governorates',
    divisions: [
      'Ajloun', 'Amman', 'Aqaba', 'Balqa', 'Irbid', 'Jerash', 'Karak', 'Ma\'an', 'Madaba', 'Mafraq', 'Tafilah', 'Zarqa'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Lebanon': {
    label: 'Governorates',
    divisions: [
      'Akkar', 'Baalbek-Hermel', 'Beirut', 'Beqaa', 'Keserwan-Jbeil', 'Mount Lebanon', 'Nabatieh', 'North', 'South'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Afghanistan': {
    label: 'Provinces',
    divisions: [
      'Badakhshan', 'Badghis', 'Baghlan', 'Balkh', 'Bamyan', 'Daykundi', 'Farah', 'Faryab', 'Ghazni',
      'Ghor', 'Helmand', 'Herat', 'Jowzjan', 'Kabul', 'Kandahar', 'Kapisa', 'Khost', 'Kunar',
      'Kunduz', 'Laghman', 'Logar', 'Nangarhar', 'Nimruz', 'Nuristan', 'Paktia', 'Paktika',
      'Panjshir', 'Parwan', 'Samangan', 'Sar-e Pol', 'Takhar', 'Urozgan', 'Wardak', 'Zabul'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Tanzania': {
    label: 'Regions',
    divisions: [
      'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi', 'Kigoma',
      'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Mjini Magharibi', 'Morogoro', 'Mtwara',
      'Mwanza', 'Njombe', 'Pemba North', 'Pemba South', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga',
      'Simiyu', 'Singida', 'Songwe', 'Tabora', 'Tanga', 'Unguja North', 'Unguja South'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Uganda': {
    label: 'Regions',
    divisions: [
      { name: 'Central Region', cities: ['Kampala', 'Entebbe'] },
      { name: 'Eastern Region', cities: ['Jinja', 'Mbale'] },
      { name: 'Northern Region', cities: ['Gulu', 'Lira'] },
      { name: 'Western Region', cities: ['Mbarara', 'Fort Portal'] }
    ]
  },

  'Senegal': {
    label: 'Regions',
    divisions: [
      'Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack', 'Kédougou', 'Kolda', 'Louga',
      'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Thiès', 'Ziguinchor'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Zimbabwe': {
    label: 'Provinces',
    divisions: [
      'Bulawayo', 'Harare', 'Manicaland', 'Mashonaland Central', 'Mashonaland East', 'Mashonaland West',
      'Masvingo', 'Matabeleland North', 'Matabeleland South', 'Midlands'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Serbia': {
    label: 'Regions',
    divisions: [
      { name: 'Belgrade', cities: ['Belgrade', 'Beograd'] },
      { name: 'Vojvodina', cities: ['Novi Sad', 'Subotica'] },
      { name: 'Šumadija and Western Serbia', cities: ['Kragujevac', 'Čačak'] },
      { name: 'Southern and Eastern Serbia', cities: ['Niš'] },
      { name: 'Kosovo and Metohija', cities: ['Pristina'] }
    ]
  },

  'Algeria': {
    label: 'Provinces',
    divisions: [
      'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira',
      'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
      'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla',
      'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
      'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar',
      'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Menia'
    ].map(n => ({ name: n, cities: n === 'Algiers' ? ['Algiers', 'Alger'] : [n] }))
  },

  'Belarus': {
    label: 'Regions & Minsk',
    divisions: ['Brest', 'Gomel', 'Grodno', 'Minsk', 'Minsk Region', 'Mogilev', 'Vitebsk']
      .map(n => ({ name: n, cities: [n.replace(' Region', '')] }))
  },

  'Bulgaria': {
    label: 'Provinces',
    divisions: [
      'Blagoevgrad', 'Burgas', 'Dobrich', 'Gabrovo', 'Haskovo', 'Kardzhali', 'Kyustendil', 'Lovech',
      'Montana', 'Pazardzhik', 'Pernik', 'Pleven', 'Plovdiv', 'Razgrad', 'Ruse', 'Shumen',
      'Silistra', 'Sliven', 'Smolyan', 'Sofia', 'Sofia Province', 'Stara Zagora', 'Targovishte',
      'Varna', 'Veliko Tarnovo', 'Vidin', 'Vratsa', 'Yambol'
    ].map(n => ({ name: n, cities: [n.replace(' Province', '')] }))
  },

  'Cambodia': {
    label: 'Provinces & Capital',
    divisions: [
      'Banteay Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang', 'Kampong Speu', 'Kampong Thom',
      'Kampot', 'Kandal', 'Kep', 'Koh Kong', 'Kratié', 'Mondulkiri', 'Oddar Meanchey', 'Pailin',
      'Phnom Penh', 'Preah Sihanouk', 'Preah Vihear', 'Prey Veng', 'Pursat', 'Ratanakiri',
      'Siem Reap', 'Stung Treng', 'Svay Rieng', 'Takéo', 'Tboung Khmum'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Cameroon': {
    label: 'Regions',
    divisions: [
      { name: 'Adamawa', cities: ['Ngaoundéré'] },
      { name: 'Centre', cities: ['Yaoundé'] },
      { name: 'East', cities: ['Bertoua'] },
      { name: 'Far North', cities: ['Maroua'] },
      { name: 'Littoral', cities: ['Douala'] },
      { name: 'North', cities: ['Garoua'] },
      { name: 'Northwest', cities: ['Bamenda'] },
      { name: 'South', cities: ['Ebolowa'] },
      { name: 'Southwest', cities: ['Buea', 'Limbe'] },
      { name: 'West', cities: ['Bafoussam'] }
    ]
  },

  'Costa Rica': {
    label: 'Provinces',
    divisions: ['Alajuela', 'Cartago', 'Guanacaste', 'Heredia', 'Limón', 'Puntarenas', 'San José']
      .map(n => ({ name: n, cities: [n] }))
  },

  'Cyprus': {
    label: 'Districts',
    divisions: ['Famagusta', 'Kyrenia', 'Larnaca', 'Limassol', 'Nicosia', 'Paphos']
      .map(n => ({ name: n, cities: [n] }))
  },

  'Dominican Republic': {
    label: 'Provinces & DN',
    divisions: [
      'Azua', 'Baoruco', 'Barahona', 'Dajabón', 'Distrito Nacional', 'Duarte', 'El Seibo', 'Elías Piña',
      'Espaillat', 'Hato Mayor', 'Hermanas Mirabal', 'Independencia', 'La Altagracia', 'La Romana',
      'La Vega', 'María Trinidad Sánchez', 'Monseñor Nouel', 'Monte Cristi', 'Monte Plata', 'Pedernales',
      'Peravia', 'Puerto Plata', 'Samaná', 'San Cristóbal', 'San José de Ocoa', 'San Juan',
      'San Pedro de Macorís', 'Sánchez Ramírez', 'Santiago', 'Santiago Rodríguez', 'Santo Domingo', 'Valverde'
    ].map(n => ({ name: n, cities: n === 'Distrito Nacional' ? ['Santo Domingo'] : [n] }))
  },

  'Ecuador': {
    label: 'Provinces',
    divisions: [
      'Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas',
      'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos', 'Manabí', 'Morona-Santiago', 'Napo',
      'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena', 'Santo Domingo de los Tsáchilas', 'Sucumbíos',
      'Tungurahua', 'Zamora-Chinchipe'
    ].map(n => ({ name: n, cities: n === 'Pichincha' ? ['Quito'] : n === 'Guayas' ? ['Guayaquil'] : n === 'Azuay' ? ['Cuenca'] : [n] }))
  },

  'El Salvador': {
    label: 'Departments',
    divisions: [
      'Ahuachapán', 'Cabañas', 'Chalatenango', 'Cuscatlán', 'La Libertad', 'La Paz', 'La Unión',
      'Morazán', 'San Miguel', 'San Salvador', 'San Vicente', 'Santa Ana', 'Sonsonate', 'Usulután'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Estonia': {
    label: 'Counties',
    divisions: [
      'Harju', 'Hiiu', 'Ida-Viru', 'Järva', 'Jõgeva', 'Lääne', 'Lääne-Viru', 'Pärnu',
      'Põlva', 'Rapla', 'Saare', 'Tartu', 'Valga', 'Viljandi', 'Võru'
    ].map(n => ({ name: n, cities: n === 'Harju' ? ['Tallinn'] : [n] }))
  },

  'Georgia': {
    label: 'Regions & Tbilisi',
    divisions: [
      'Adjara', 'Guria', 'Imereti', 'Kakheti', 'Kvemo Kartli', 'Mtskheta-Mtianeti',
      'Racha-Lechkhumi', 'Samegrelo-Zemo Svaneti', 'Samtskhe-Javakheti', 'Shida Kartli', 'Tbilisi', 'Abkhazia'
    ].map(n => ({ name: n, cities: n === 'Adjara' ? ['Batumi'] : n === 'Imereti' ? ['Kutaisi'] : [n] }))
  },

  'Guatemala': {
    label: 'Departments',
    divisions: [
      'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'El Progreso', 'Escuintla',
      'Guatemala', 'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango',
      'Quiché', 'Retalhuleu', 'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez',
      'Totonicapán', 'Zacapa'
    ].map(n => ({ name: n, cities: n === 'Guatemala' ? ['Guatemala City'] : [n] }))
  },

  'Honduras': {
    label: 'Departments',
    divisions: [
      'Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés', 'El Paraíso',
      'Francisco Morazán', 'Gracias a Dios', 'Intibucá', 'Bay Islands', 'La Paz', 'Lempira',
      'Ocotepeque', 'Olancho', 'Santa Bárbara', 'Valle', 'Yoro'
    ].map(n => ({ name: n, cities: n === 'Francisco Morazán' ? ['Tegucigalpa'] : n === 'Cortés' ? ['San Pedro Sula'] : [n] }))
  },

  'Hong Kong': {
    label: 'Districts',
    divisions: [
      'Central and Western', 'Eastern', 'Southern', 'Wan Chai', 'Kowloon City', 'Kwun Tong',
      'Sham Shui Po', 'Wong Tai Sin', 'Yau Tsim Mong', 'Islands', 'Kwai Tsing', 'North',
      'Sai Kung', 'Sha Tin', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Yuen Long'
    ].map(n => ({ name: n, cities: [n, 'Hong Kong'] }))
  },

  'Iceland': {
    label: 'Regions',
    divisions: [
      { name: 'Capital Region', cities: ['Reykjavik', 'Reykjavík', 'Kópavogur'] },
      { name: 'Southern Peninsula', cities: ['Keflavík'] },
      { name: 'Western Region', cities: ['Akranes', 'Borgarnes'] },
      { name: 'Westfjords', cities: ['Ísafjörður'] },
      { name: 'Northwestern Region', cities: ['Sauðárkrókur'] },
      { name: 'Northeastern Region', cities: ['Akureyri'] },
      { name: 'Eastern Region', cities: ['Egilsstaðir'] },
      { name: 'Southern Region', cities: ['Selfoss'] }
    ]
  },

  'Kazakhstan': {
    label: 'Regions & Cities',
    divisions: [
      'Abai', 'Akmola', 'Aktobe', 'Almaty', 'Almaty Region', 'Astana', 'Atyrau',
      'East Kazakhstan', 'Jambyl', 'Jetisu', 'Karaganda', 'Kostanay', 'Kyzylorda',
      'Mangystau', 'North Kazakhstan', 'Pavlodar', 'Shymkent', 'Turkistan', 'Ulytau', 'West Kazakhstan'
    ].map(n => ({ name: n, cities: [n.replace(' Region', '')] }))
  },

  'Kuwait': {
    label: 'Governorates',
    divisions: ['Al Ahmadi', 'Al Asimah', 'Al Farwaniyah', 'Al Jahra', 'Hawalli', 'Mubarak Al-Kabeer']
      .map(n => ({ name: n, cities: n === 'Al Asimah' ? ['Kuwait City'] : [n] }))
  },

  'Lithuania': {
    label: 'Counties',
    divisions: ['Alytus', 'Kaunas', 'Klaipėda', 'Marijampolė', 'Panevėžys', 'Šiauliai', 'Tauragė', 'Telšiai', 'Utena', 'Vilnius']
      .map(n => ({ name: n, cities: [n] }))
  },

  'Luxembourg': {
    label: 'Cantons',
    divisions: [
      'Capellen', 'Clervaux', 'Diekirch', 'Echternach', 'Esch-sur-Alzette', 'Grevenmacher',
      'Luxembourg', 'Mersch', 'Redange', 'Remich', 'Vianden', 'Wiltz'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Malta': {
    label: 'Regions',
    divisions: ['Eastern', 'Gozo', 'Northern', 'Port', 'Southern', 'Western']
      .map(n => ({ name: n, cities: n === 'Port' ? ['Valletta'] : [n] }))
  },

  'Mongolia': {
    label: 'Provinces & Capital',
    divisions: [
      'Arkhangai', 'Bayan-Ölgii', 'Bayankhongor', 'Bulgan', 'Darkhan-Uul', 'Dornod', 'Dornogovi',
      'Dundgovi', 'Govi-Altai', 'Govisümber', 'Khentii', 'Khovd', 'Khövsgöl', 'Ömnögovi',
      'Orkhon', 'Övörkhangai', 'Selenge', 'Sükhbaatar', 'Töv', 'Ulaanbaatar', 'Uvs', 'Zavkhan'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Myanmar': {
    label: 'States & Regions',
    divisions: [
      'Ayeyarwady', 'Bago', 'Chin', 'Kachin', 'Kayah', 'Kayin', 'Magway', 'Mandalay',
      'Mon', 'Naypyidaw', 'Rakhine', 'Sagaing', 'Shan', 'Tanintharyi', 'Yangon'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Oman': {
    label: 'Governorates',
    divisions: [
      'Ad Dakhiliyah', 'Ad Dhahirah', 'Al Batinah North', 'Al Batinah South', 'Al Buraimi',
      'Al Wusta', 'Ash Sharqiyah North', 'Ash Sharqiyah South', 'Dhofar', 'Musandam', 'Muscat'
    ].map(n => ({ name: n, cities: n === 'Dhofar' ? ['Salalah'] : [n] }))
  },

  'Panama': {
    label: 'Provinces & Comarcas',
    divisions: [
      'Bocas del Toro', 'Chiriquí', 'Coclé', 'Colón', 'Darién', 'Emberá-Wounaan', 'Guna Yala',
      'Herrera', 'Los Santos', 'Naso Tjër Di', 'Ngäbe-Buglé', 'Panamá', 'Panamá Oeste', 'Veraguas',
      'Madugandí', 'Wargandí'
    ].map(n => ({ name: n, cities: n === 'Panamá' ? ['Panama City'] : [n] }))
  },

  'Paraguay': {
    label: 'Departments & Capital',
    divisions: [
      'Alto Paraguay', 'Alto Paraná', 'Amambay', 'Asunción', 'Boquerón', 'Caaguazú', 'Caazapá',
      'Canindeyú', 'Central', 'Concepción', 'Cordillera', 'Guairá', 'Itapúa', 'Misiones',
      'Ñeembucú', 'Paraguarí', 'Presidente Hayes', 'San Pedro'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Qatar': {
    label: 'Municipalities',
    divisions: ['Al Daayen', 'Al Khor', 'Al Rayyan', 'Al Shamal', 'Al Shahaniya', 'Al Wakrah', 'Doha', 'Umm Salal']
      .map(n => ({ name: n, cities: [n] }))
  },

  'Slovakia': {
    label: 'Regions',
    divisions: ['Banská Bystrica', 'Bratislava', 'Košice', 'Nitra', 'Prešov', 'Trenčín', 'Trnava', 'Žilina']
      .map(n => ({ name: n, cities: [n] }))
  },

  'Slovenia': {
    label: 'Regions',
    divisions: [
      'Carinthia', 'Central Sava', 'Central Slovenia', 'Coastal-Karst', 'Drava', 'Gorizia',
      'Littoral-Inner Carniola', 'Lower Sava', 'Mura', 'Savinja', 'Southeast Slovenia', 'Upper Carniola'
    ].map(n => ({ name: n, cities: n === 'Central Slovenia' ? ['Ljubljana'] : n === 'Drava' ? ['Maribor'] : [n] }))
  },

  'Sudan': {
    label: 'States',
    divisions: [
      'Al Jazirah', 'Al Qadarif', 'Blue Nile', 'Central Darfur', 'East Darfur', 'Kassala', 'Khartoum',
      'North Darfur', 'North Kordofan', 'Northern', 'Red Sea', 'River Nile', 'Sennar',
      'South Darfur', 'South Kordofan', 'West Darfur', 'West Kordofan', 'White Nile'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Syria': {
    label: 'Governorates',
    divisions: [
      'Aleppo', 'Al-Hasakah', 'Al-Raqqah', 'As-Suwayda', 'Damascus', 'Daraa', 'Deir ez-Zor',
      'Hama', 'Homs', 'Idlib', 'Latakia', 'Quneitra', 'Rif Dimashq', 'Tartus'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Taiwan': {
    label: 'Divisions',
    divisions: [
      'Changhua', 'Chiayi', 'Chiayi City', 'Hsinchu', 'Hsinchu City', 'Hualien', 'Kaohsiung',
      'Keelung', 'Kinmen', 'Lienchiang', 'Miaoli', 'Nantou', 'New Taipei', 'Penghu',
      'Pingtung', 'Taichung', 'Tainan', 'Taipei', 'Taitung', 'Taoyuan', 'Yilan', 'Yunlin'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Tunisia': {
    label: 'Governorates',
    divisions: [
      'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan',
      'Kasserine', 'Kébili', 'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul',
      'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Uruguay': {
    label: 'Departments',
    divisions: [
      'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida', 'Lavalleja',
      'Maldonado', 'Montevideo', 'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto',
      'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Uzbekistan': {
    label: 'Regions & Tashkent',
    divisions: [
      'Andijan', 'Bukhara', 'Fergana', 'Jizzakh', 'Karakalpakstan', 'Kashkadarya', 'Khorezm',
      'Namangan', 'Navoiy', 'Samarkand', 'Sirdaryo', 'Surkhandarya', 'Tashkent', 'Tashkent Region'
    ].map(n => ({ name: n, cities: [n.replace(' Region', '')] }))
  },

  'Yemen': {
    label: 'Governorates',
    divisions: [
      'Abyan', 'Aden', 'Al Bayda', 'Al Hudaydah', 'Al Jawf', 'Al Mahrah', 'Al Mahwit', 'Amran',
      'Dhamar', 'Hadhramaut', 'Hajjah', 'Ibb', 'Lahij', 'Ma\'rib', 'Raymah', 'Saada',
      'Sanaa', 'Sanaa Governorate', 'Shabwah', 'Socotra', 'Taiz', 'Al Dhale\'e'
    ].map(n => ({ name: n, cities: [n.replace(' Governorate', '')] }))
  },

  'Zambia': {
    label: 'Provinces',
    divisions: [
      'Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka', 'Muchinga',
      'North-Western', 'Northern', 'Southern', 'Western'
    ].map(n => ({ name: n, cities: n === 'Copperbelt' ? ['Ndola', 'Kitwe'] : n === 'Southern' ? ['Livingstone'] : [n] }))
  },

  'Albania': {
    label: 'Counties',
    divisions: ['Berat', 'Dibër', 'Durrës', 'Elbasan', 'Fier', 'Gjirokastër', 'Korçë', 'Kukës', 'Lezhë', 'Shkodër', 'Tirana', 'Vlorë']
      .map(n => ({ name: n, cities: [n] }))
  },

  'Armenia': {
    label: 'Provinces & Yerevan',
    divisions: ['Aragatsotn', 'Ararat', 'Armavir', 'Gegharkunik', 'Kotayk', 'Lori', 'Shirak', 'Syunik', 'Tavush', 'Vayots Dzor', 'Yerevan']
      .map(n => ({ name: n, cities: [n] }))
  },

  'DR Congo': {
    label: 'Provinces',
    divisions: [
      'Bas-Uele', 'Équateur', 'Haut-Katanga', 'Haut-Lomami', 'Haut-Uele', 'Ituri', 'Kasaï',
      'Kasaï-Central', 'Kasaï-Oriental', 'Kinshasa', 'Kongo-Central', 'Kwango', 'Kwilu', 'Lomami',
      'Lualaba', 'Mai-Ndombe', 'Maniema', 'Mongala', 'Nord-Kivu', 'Nord-Ubangi', 'Sankuru',
      'Sud-Kivu', 'Sud-Ubangi', 'Tanganyika', 'Tshopo', 'Tshuapa'
    ].map(n => ({ name: n, cities: n === 'Haut-Katanga' ? ['Lubumbashi'] : n === 'Nord-Kivu' ? ['Goma'] : [n] }))
  },

  'Ivory Coast': {
    label: 'Districts',
    divisions: [
      'Abidjan', 'Bas-Sassandra', 'Comoé', 'Denguélé', 'Gôh-Djiboua', 'Lacs', 'Lagunes',
      'Montagnes', 'Sassandra-Marahoué', 'Savanes', 'Vallée du Bandama', 'Woroba', 'Yamoussoukro', 'Zanzan'
    ].map(n => ({ name: n, cities: [n] }))
  },

  'Bahrain': {
    label: 'Governorates',
    divisions: ['Capital', 'Muharraq', 'Northern', 'Southern']
      .map(n => ({ name: n, cities: n === 'Capital' ? ['Manama', 'Bahrain'] : [n] }))
  }
};

window.WIKIPEDIA_COUNTRY_ALIASES = {
  'united states': 'USA',
  'united states of america': 'USA',
  'us': 'USA',
  'united kingdom': 'UK',
  'great britain': 'UK',
  'united arab emirates': 'UAE',
  'czechia': 'Czech Republic',
  'korea, republic of': 'South Korea',
  'republic of korea': 'South Korea',
  'russian federation': 'Russia',
  'viet nam': 'Vietnam',
  'iran, islamic republic of': 'Iran',
  'türkiye': 'Turkey',
  'turkiye': 'Turkey',
  'cote d\'ivoire': 'Ivory Coast',
  'côte d\'ivoire': 'Ivory Coast',
  'democratic republic of the congo': 'DR Congo'
};

window.getWikipediaDivisionsEntry = function(country) {
  if (!country) return null;
  const raw = String(country).trim();
  const lower = raw.toLowerCase();
  const divs = window.WIKIPEDIA_COUNTRY_DIVISIONS || {};
  const aliased = (window.WIKIPEDIA_COUNTRY_ALIASES && window.WIKIPEDIA_COUNTRY_ALIASES[lower]) || raw;
  const key = Object.keys(divs).find(k => k.toLowerCase() === aliased.toLowerCase() || k.toLowerCase() === lower);
  return key ? { countryKey: key, label: divs[key].label || 'States', divisions: divs[key].divisions || [] } : null;
};

