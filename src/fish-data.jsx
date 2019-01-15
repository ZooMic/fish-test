import React, { Fragment } from 'react';
import img22 from './img/22.png';
import img25_1 from './img/25-1.png';
import img25_2 from './img/25-2.png';
import img25_3 from './img/25-3.png';
import img28 from './img/28.png';

export default [
    {
        title: '1. Karty graficzne - podział',
        content:
            <Fragment>
                <b>1. Bufory ramki</b> - służą jedynie do wyświetlania obrazu na ekranie monitora<br />
                <b>2. Akceleratory  grafiki płaskiej</b> - wspomagające CPU przy operacjach typu: wyświetlanie wielokątów i lini prostych, wypełnianiu wielokątków przesuwaniu i skalowaniu okien, itp.<br />
                <b>3. Akceleratory grafiki trójwymiarowej</b> - Odciążają jednostkę centralną w końcowym procesie obliczeń. W przypadku tych urządzeń w dalszym ciągu wstępne przygotowanie sceny 3D spoczywa na CPU, a szybkość realizacji tego zadania zależy od algorytmów zastosowanych przez programistę.<br />
                <b>4. Procesory graficzne</b> - posiadają układy wspomagające operacje geometryczne działają przy minimalnym zaangażowaniu jednostki centralnej komputera w proces tworzenia grafiki, określa się je również mianem akceleratorów geometrii.<br />
            </Fragment>
    }, {
        title: '2. Etapy generowania grafiki 3D',
        content:
            <Fragment>
                Niezależnie od konstrukcji karty graficznej najważniejszym zadaniem, jakie musi wykonać komputer przy tworzeniu trójwymiarowej grafiki jest przedstawienie jej na płaskim ekranie monitora. Cały proces tworzenia obrazu od chwili otrzymania danych z programu do momentu wyświetlenia grafiki na ekranie monitora nazywany jest często przetwarzaniem strumienia grafiki trójwymiarowej.<br/>
                W strumieniu tym wyróżnić można dwa zasadnicze etapy obliczeń:<br />
                - przekształcenia geometryczne<br />
                - rendering oraz rasteryzacja sceny.
            </Fragment>
    }, {
        title: '3. Na czym polega ustawianie geometrii',
        content:
            <Fragment>
                <b>a) Triangularyzacja</b> - Program generujący obraz 3D poprzez odpowiedni interfejs OpenGL czy Direct3D wysyła współrzędne wszystkich wierzchołków sceny do tzw. układu ustawiania trójkątów. Jest to specjalna jednostka, będąca częścią chipu graficznego. Grupuje ona wszystkie trójki wierzchołków w trójkąty. Każda trójka współrzędnych punktów powinna być zapamiętana w oddzielnym wektorze. Jako że praktycznie każdy wierzchołek należy nie do jednego, a do dwóch lub nawet więcej trójkątów stosuje się więc pewne techniki, które mają zmniejszyć rozmiar macierzy opisujących współrzędne wierzchołków opierają się one na tworzeniu tzw. pasów (strips) i wachlarzy (fans).<br/>
                <b>b) Ustawianie geometrii bryły widzenia</b> - Rozpoczynając generowanie trójwymiarowej sceny niezbędne jest utworzenie „mapy” opisującej położenie wszystkich występujących na niej obiektów. Następnie wszystkie obecne na ekranie bryły należy poddać trzem operacjom transformacji geometrycznych:<br/>
                - Skalowaniu<br/>
                - Translacji<br/>
                - Rotacji<br/>
                ustawia to obiekty w odpowiednim położeniu oraz we właściwej skali.<br/>
                <b>c) Wycinanie i zakrywanie linii niewidocznych.</b>
            </Fragment>
    }, {
        title: '4. Co to jest rendering i jego podział',
        content:
            <Fragment>
                Na złożone z trójkątów szkieletowe bryły akcelerator: nakłada wypełnienie pustych przestrzeni wewnątrz wielokątów oraz symuluje światła padające na wielokąty. Rendering można podzielić na trzy główne procesy: <br/>
                <b>a) Teksturowanie</b> <br/>
                <b>b) Oświetlenie i cieniowanie</b> <br/>
                <b>c) Dodawanie efektów specjalnych</b>
            </Fragment>
    }, {
        title: '5. Co to jest teksturowanie',
        content:
            <Fragment>
                Najważniejszy i najbardziej skomplikowany etap renderingu. Zabieg ten polega na nakładaniu na trójwymiarowy szkielet płaskich obrazków nazywanych teksturami mających imitować spotykane w realnym świecie powierzchnie. <br/>
                Cały proces mapowania (nakładania) tekstur sprowadza się do odpowiedniego owijania brył teksturami. Problem polega na tym, iż wszystkie elementy trójwymiarowej sceny składają się z trójkątów o różnych rozmiarach. Tekstury należy więc dopasować do wielkości odpowiadającej poszczególnych trójkątów. Proces ten nazywa się wycinaniem (ang. clipping) <br/>
                Wycinanie (clipping) Polega na wyodrębnieniu trójkąta o żądanej wielkości z kwadratowej zazwyczaj tekstury. W tym celu określane są współrzędne trzech punktów na teksturze, a następnie przyporządkowuje się je stosownym wierzchołkom teksturowanego trójkąta.
            </Fragment>
    }, {
        title: '6. MIP - mapping',
        content:
            <Fragment>    
                Z pierwotnych tekstur, które mają ściśle określony rozmiar, np. 8×8 lub 64×64 piksele, prawie nigdy nie da się wyciąć odpowiedniego pod względem rozmiarów trójkąta do mapowanej przestrzeni. Mając to na uwadze oraz aby zapobiec ciągłemu przeskalowywaniu tekstur opracowano mechanizm MIP mappingu (Multum in Parvo - wiele w niewielu). Przed renderowaniem sceny z każdej tekstury tworzonych jest kilka (zazwyczaj osiem) tzw. map MIP. Mapy MIP to nic innego jak zmniejszone bitmapy utworzone na podstawie tekstury wzorcowej. Każda kolejna mapa MIP jest czterokrotnie mniejsza od poprzedniej. Jeśli pierwsza miała rozmiar 256×256 pikseli, to następna będzie miała wielkość 128×128 punktów, kolejna 64×64 itd. Przy nakładaniu na trójkąt tekstury do wycinania wybierana jest jedna lub dwie sąsiednie ze zbioru map MIP. Do poteksturowania obiektu trójwymiarowego używa się tej tekstury, której rozdzielczość jest wystarczająca do reprezentowania obiektu obserwowanego z pewnej odległości. Właśnie od odległości zależy, która mipmapa zostanie wybrana. Im obiekt znajduje się dalej od obserwatora, tym mniejszą zajmuje powierzchnię i tym mniejsza tekstura jest potrzebna. Mipmapping jest implementowany sprzętowo w kartach grafiki.<br/>
                <b>Zalety mipmappingu:</b><br/>
                Wstępne usuwanie zakłóceń skalowanych tekstur, co ma istotne znaczenie w grafice czasu rzeczywistego (gry komputerowe, symulatory lotu).<br/>
                Zwiększenie prędkości teksturowania, ponieważ przetwarzana jest o wiele mniejsza liczba pikseli tekstury.<br/>
                <b>Wady:</b><br/>
                Zwiększenie wymagań pamięciowych o 1/3.<br/>
            </Fragment>
    }, {
        title: '7. Próbkowanie punktowe',
        content:
            <Fragment>
                Zastosowanie MIP mappingu nie rozwiązuje w pełni problemu dokładnego dopasowania tekstur do wielkości trójkątów. Dlatego bardzo często przy teksturowaniu, pojedyncze teksele, czyli najmniejsze elementy (punkty) tekstury, powielane są w różnych miejscach wielokąta.<br/>
                Technika przyporządkowania każdemu pikselowi trójkąta tylko jednego teksela tekstury i w razie potrzeby kilkukrotnego powielenia punktów nosi nazwę próbkowania punktowego (ang. point sampling texturing).<br/>
                Wadą tego sposobu jest to, że powielenie jednego punktu do kilku objawia się efektem potocznie nazywanym pikselozą – widoczne stają się kolorowe piksele. Jest to szczególnie wyraźne wtedy, gdy tekstura musi pokryć obszar znacząco większy niż ona sama. Aby uniknąć powyższego efektu korzysta się z tzw. filtrowania tekstur.kątów. Dlatego bardzo często przy teksturowaniu, pojedyncze teksele, czyli najmniejsze elementy (punkty) tekstury, powielane są w różnych miejscach wielokąta.<br/>
            </Fragment>
    }, {
        title: '8. Filtrowanie tekstur',
        content:
            <Fragment>
                <b>a) filtrowanie dwuliniowe</b> - Polega na przyporządkowaniu każdemu punktowi teksturowanego trójkąta barwy otrzymanej w wyniku interpolacji czterech sąsiednich tekseli tekstury.<br/>
                <b>b) filtrowanie trójliniowe</b> - Do ujednolicania barwy zamiast sąsiednich tekseli stosuje się dwie kolejne mapy MIP. Najpierw poddaje się interpolacji dwuliniowej mapę bezpośrednio mniejszą następnie bezpośrednio większą np. jeśli trójkąt wymaga wycinania z mapy o rozdzielczości 100 tekseli, to brane są pod uwagę mapy 64x64 i 128x128. Dopiero uśredniony wynik obu tych operacji (w sumie interpolujemy wartość ośmiu tekseli) nakłada się na mapowany trójkąt.<br/>
                <b>c) filtrowanie anizotropowe</b> - Wymaga największej mocy obliczeniowej. Bierze pod uwagę orientację przestrzenną tekseli względem obserwatora. Dzięki temu obszary, z których interpolowane są brakujące wartości, układają się w kształt elipsy, prostokąta lub rombu (długa oś wyznacza kierunek obserwacji). Filtrowanie anizotropowe umożliwia zatem zachowanie oryginalnego kształtu tekstur również na obiektach znajdujących się pod pewnym kątem w stosunku do obserwatora.
            </Fragment>
    }, {
        title: '9. Korekcja perspektywy',
        content:
            <Fragment>
                Problem z odwzorowaniem perspektywy dotyczy głownie: dużych trójkątów (ściany, sufity, podłogi) lub trójkąty znajdujące się niemal prostopadle do płaszczyzny ekranu.<br/>
                W celu wyeliminowania tych niepożądanych efektów stosuje się algorytmy korekcji perspektywy. Metoda ta polega na:<br/>
                a) Stworzeniu wirtualnego punktu w nieskończoności.<br/>
                b) Następnie każda linia poprowadzona z dowolnego miejsca obrazu musi zbiec się w owym punkcie.<br/>
                c) Dopiero wówczas akcelerator, zgodnie z zasadą rzutu perspektywicznego, nakłada tekstury już bez tych niechcianych deformacji.
            </Fragment>
    }, {
        title: '10. Mapowanie wybojów',
        content:
            <Fragment>
                Mapowanie wybojów powoduje złudzenie, że obiekt nie jest gładki, a chropowaty. Gdy na niego patrzymy zdaje nam się, że widzimy wyboje, rysy czy rowki. Z jednej strony wybój (wypukłość) będzie jasny, z drugiej ciemny. Należy pamiętać, że mapowanie wybojów to efekt manipulujący wyłącznie grą światła a nie wielokątami.<br/>
                Metody mapowania wybojów można podzielić na:<br/>
                <b>1. Mapowanie wypukłości (bump mapping)</b> - W metodzie tej dla każdej tekstury tworzone są tzw. mapy wybojów (ang. bump maps). Są one płaskimi bitmapami, podobnie jak zwykłe tekstury. Jasność poszczególnych pikseli określa położenie (wysokość) tekseli nad płaszczyzną tekstury. Mapa wybojów jest nakładana na pierwotną teksturę. Dzięki temu otrzymujemy dodatkową informację o usytuowaniu każdego teksela względem płaszczyzny tekstury.<br/>
                <b>2. Tłoczenie wybojów (emboss bump mapping)</b> - Sprawdza się ono dobrze wtedy, gdy na tekstury spoglądamy pod niewielkim kątem lub są one nakładane na poruszające się obiekty. Tłoczenie realizowane jest w trzech etapach:<br/>
                - W pierwszym z nich z mapy opisującej wygląd wypukłości (mapy wybojów) tworzone są dwa monochromatyczne obrazy. Jeden zostanie wykorzystany do przedstawienia obszarów jaśniejszych, a drugi będzie odpowiadał za fragmenty zacienione.<br/>
                - W drugiej fazie obie bitmapy przesuwane są o kilka pikseli względem siebie (jedna do tyłu, druga do przodu) wzdłuż kierunku padającego światła.<br/>
                - Ostatni z etapów polega na zlaniu rozsuniętych bitmap (przy wykorzystaniu omawianego w dalszej części prezentacji alpha-blendingu) z właściwą teksturą obiektu.<br/>
                <b>3. Środowiskowe mapowanie wybojów</b> - Najbardziej zaawansowany sposób bump mappingu polegający na użyciu trzech osobnych map: właściwej, wybojów oraz środowiska. Mapa wybojów (bump map) posiadająca zapisane informacje o wysokości każdego teksela nakładana jest na mapę środowiskową (environment map), która może myć mapą świateł lub inną mapą tekstury. Tak stworzona mapa nosi nazwę tzw. wichrowatej mapy środowiska (perturbed environment map) łączonej następnie z mapą właściwą (texture map) bazującą na oryginalnych kolorach tekstury. Środowiskowe mapowanie wybojów pozwala uzyskać wiele ciekawych efektów, takich jak falująca powierzchnia wody lub karoseria samochodu odbijająca otoczenie. Jest to aktualnie najpopularniejsza metoda bump mappingu.<br/>
                <b>4. DOT 3 mapping</b> - jedna z wielu technik symulowania wypukłości na płaskich wielokątach, stosowana w grafice trójwymiarowej. Jest rozwinięciem koncepcji mapowania wypukłości (ang. Bump Mapping) opracowanej przez Jamesa F. Blinna i opisanej w publikacji z 1978 roku[1]. Podstawą działania mapowania normalnych jest zastąpienie wektorów normalnych opisanych przez geometrię, wektorami zapisanymi w specjalnej teksturze - mapie normalnych. Istnieje wiele podobnych technik symulowania wypukłości, jednak odwzorowanie normalnych jest obok parallax occlusion mappingu najczęściej stosowaną techniką we współczesnych grach komputerowych. Głównie za sprawą niewielkiej złożoności obliczeniowej, wymaganej do uzyskania efektu. Mapowanie normalnych pozwala w bardzo efektywny sposób, uzyskać wizualne złudzenie większej złożoności modelu trójwymiarowego niż jest w rzeczywistości. Dzięki temu liczba wielokątów potrzebnych do opisania takiego modelu może być znacznie ograniczona.<br/>
                Często jest łączone z mapowaniem środowiska (Multiteksturowanie, Mapowanie trójwymiarowe)<br/>
                <b>1. Mapowanie środowiska</b> - W bardziej zaawansowanych metodach bump-mappingu dodatkowo wykorzystuje się tzw. mapy środowiska (ang. environmental maps). Mapowanie środowiskowe w połączeniu z bump-mappingiem pozwala otrzymać zaawansowane efekty, takie jak falująca powierzchnia wody, w której odbijają się nadbrzeżne drzewa. Uzyskanie takich rezultatów możliwe jest dzięki nałożeniu w jednym przebiegu trzech bitmap: podstawowej tekstury, mapy wypukłości oraz mapy środowiska. Mapa wybojów nakładana jest na mapę środowiska, w wyniku tego powstaje zaburzona mapa środowiska (ang. perturbed environment map), a następnie łączona jest ona z właściwą teksturą nakładaną na obiekt. Mapy środowiska zawierają w sobie informacje m.in. o refleksach na powierzchni przedmiotu od rozstawionych na generowanej scenie wielokolorowych: świateł lustrzanych, odbić i refleksów świetlnych, które pochodzą od innych przedmiotów otaczających obiekt. W procesie mapowania środowiskowego dzięki nałożeniu na pierwotną teksturę przedmiotu bitmapy środowiskowej uzyskuje się wszelkiego rodzaju efekty luster, szklanych drzwi, itp.<br/>
                <b>2. Multiteksturowanie</b> - Podczas teksturowania, w większości przypadków na jeden obiekt nakładanych jest kilka różnych bitmap. Im więcej mapowanych jest tekstur, tym potrzeba większej mocy obliczeniowej akceleratora. Szybkie chipy graficzne przeznaczone do użytku domowego umożliwiają mapowanie do kilkudziesięciu gigatekseli w ciągu jednej sekundy. Tę podaną wartość nazywa się współczynnikiem fillrate i określa ona teoretyczną szybkość procesu wypełniania wielokątów przez procesor graficzny.<br/>
                <b>3. Mapowanie trójwymiarowe</b> - W pakiecie Microsoft DirectX począwszy od wersji 8.0 programiści uwzględnili obsługę całkiem nowego rodzaju tekstur, a mianowicie tekstur 3D Podobne funkcje zaimplementowano też już w bibliotekach OpenGL 1.2 Oczywiście techniki tekstur trójwymiarowych nie są niczym nowym, gdyż z obrazów tego typu, nazywanych często warstwowymi lub wolumetrycznymi, od dłuższego czasu korzystają lekarze wykonujący komputerową tomografię. Nowa technika oznacza przede wszystkim, iż tekstury przestają wyłącznie okrywać powierzchnię przedmiotów, ale wnikają wgłąb nich. W przypadku tekstur 3D proces obliczeniowy jest wyjątkowo prosty. Aby obejrzeć wnętrze bryły należy części tekseli (wokseli) nadać atrybut przezroczystości. Można wtedy zobaczyć wszystkie najdrobniejsze detale, gdyż budowa i faktura wnętrza zawarte są w mapie wolumetrycznej. Objętość trójwymiarowych tekstur jest jednak wyjątkowo duża. Np. 32-bitowa dwuwymiarowa tekstura o wymiarach 16×16 pikseli ma objętość 1024 bajtów. Po dodaniu trzeciego wymiaru (16×16×16 punktów) rozrasta się jednak do 16 384 bajtów! Tak znaczne pojemności przetwarzanych obiektów wymagają od systemu olbrzymiej przepustowości magistrali pamięci i stosowania algorytmów kompresji tekstur.
            </Fragment>
    }, {
        title: '11. Alpha-blending',
        content:
            <Fragment>
                Aby określić stopień przezroczystości tekstury wykorzystywany jest tzw. kanał alfa, a cała technika nazywana jest alpha-blendingiem. Kanał alfa jest parametrem określającym stopień przezroczystości nakładanej tekstury. Przyjmuje on wartości od zera (obiekt zupełnie transparentny) do 255 (powierzchnia nieprzezroczysta). Jeśli nałożona zostanie tekstura z kanałem alfa równym zero, nic się nie zmieni na rysunku, tekstura będzie niewidoczna.<br/>
                Jeżeli wartość kanału wynosi np. 128, wówczas obłożony nią obiekt będzie półprzezroczysty, a znajdujące się za nim przedmioty będą przezeń widoczne. Przy maksymalnej wartości mamy do czynienia z typową nieprzezroczystą teksturą. Wartość kanału alfa jest jednym z czterech parametrów opisujących teksturę.<br/>
                Praktycznie wszystkie nowoczesne akceleratory potrafią obsługiwać 32 bitowy kolor. Jak wiadomo do przedstawienia pełnej palety barw wystarczą 24 bity. Brakujące osiem bitów to właśnie kanał alfa, a tekstury takie nazywane są RGBA. Trzy kolory składowe oraz kanał alfa.<br/>
            </Fragment>
    }, {
        title: '13. Efekty specjalne',
        content:
            <Fragment>
                Ostatnim etapem renderingu sceny 3D jest dodanie efektów specjalnych(mgły, opary nad lustrem wody, falowanie rozgrzanego powietrza, mżawka, dym, ogień oraz zmętnienia lustra wody, itp.).<br/>
                Często wykorzystywanym efektem atmosferycznym jest mgła (ang. fog). Tworzy się ją za pomocą czterech różnych technik:<br/>
                <b>1. Mgła liniowa</b> - Stosowanie tej metody polega na liniowym zamgleniu obiektów wraz ze wzrostem ich odległości od obserwatora. Wykorzystuje się w tym przypadku funkcje liniowe.<br/>
                <b>2. Tablica mgieł</b> - Lepszą i częściej stosowaną metodą jest tzw. tablica mgieł (ang. table fog). W tym przypadku stopień zamglenia, zależny od odległości od obserwatora, zapisany jest w przygotowanej uprzednio tablicy. Ta metoda doskonale się sprawdza w przypadku tworzenia takich efektów, jak opary nad powierzchnią jeziora, nieciągłe smugi mgły nad bagnami itp. <br/>
                <b>3. Mgła wykładnicza</b> - W działaniu przypomina ona efekty uzyskiwane za pomocą tablicy mgieł. Jednak w tym przypadku nie wymaga się predefiniowania stopni zamglenia, które obliczane są na bieżąco na podstawie zaprogramowanej funkcji wykładniczej.<br/>
                <b>4. Mgła wolumetryczna</b> - wykorzystywane są półprzezroczyste tekstury trójwymiarowe. Mgła zbudowana jest z warstw o różnej gęstości, co pozwala na wyjątkowo realne odwzorowanie otaczającego nas świata.
            </Fragment>
    }, {
        title: '14. Rasteryzacja',
        content:
            <Fragment>
                Etap zamiany wszystkich parametrów generowanej sceny na zbiór pikseli gotowych do wysłania na monitor. Wykonuje go specjalizowany moduł znajdujący się wewnątrz każdego, nawet najprostszego układu graficznego, nazywany jednostką rasteryzującą. Każdemu punktowi sceny przyporządkowane są trzy współrzędne: x, y, z. Przeniesienie dwóch pierwszych wartości na obraz dwuwymiarowy nie stanowi problemu. Współrzędna "z" określa zaś odległość obiektu od płaszczyzny ekranu. W większości programów wykorzystuje się 16-bitową głębię, która umożliwia odwzorowanie 65 536 pozycji obiektu. W aplikacjach inżynierskich oraz przy tworzeniu profesjonalnej grafiki używa się 24 – lub nawet 32 – bitowej głębi.<br/>
                Najważniejszymi technikami towarzyszącymi rasteryzacji są:<br/>
                - bufor głębokości, tzw. z – bufor<br/>
                - bufor szablonowy<br/>
                - antyaliasing<br/>
                - dithering
            </Fragment>
    }, {
        title: '15. Bufor Z',
        content:
            <Fragment>
                Struktura danych wykorzystywana w systemach generujących i wyświetlających obrazy trójwymiarowe, przechowująca współrzędną Z (głębokość/odległość od obserwatora) dla każdego piksela.<br/>
                Jest to matryca odpowiadająca swoją wielkością rozdzielczości ekranu, a głębokością 16, 24 lub 32 bitom, w zależności od zastosowanej głębi współrzędnej "z".<br/>
                Jeśli nowy rysowany punkt ma wartość niższą (to znaczy zasłania poprzedni obiekt), jest rysowany.
            </Fragment>
    }, {
        title: '16. Bufor szablonowy',
        content:
            <Fragment>
                Akcelerator renderuje grafikę tylko w miejscu nie zakrytym przez szablon. A następnie scala się obraz z szablonem. Większość układów graficznych dysponuje 8 bitowym buforem szablonowym. Dzięki nim można uzyskać dodatkowe efekty, jak:<br/>
                - ślady po hamowaniu samochodu,<br/>
                - plamy oleju na jezdni czy<br/>
                - tzw. cienie wolumetryczne (ang. volumetric shadow) dokładnie odwzorowujące kształt rzucających je przedmiotów.
            </Fragment>
    }, {
        title: '17. Antialiasing',
        content:
            <Fragment>
                Stosowany w celu pozbycia się efektu schodkowatości wynikającej z ograniczonej rozdzielczości ekranu.<br/>
                Można wyróżnić dwa główne typy antyaliasingu:<br/>
                <b>- krawędziowy</b> - polega na odpowiednim rozmywaniu krawędzi wzdłuż rysowanej linii czy granicy kolorów. W większości wypadków nie wygładza się wszystkich widocznych na ekranie linii, lecz tylko tę część z nich, która najbardziej wpływa na wygląd generowanej sceny.<br/>
                <b>- pełnoekranowy</b> - Niektóre procesory graficzne przetwarzają każdą klatkę w dwukrotnym powiększeniu, a następnie przeskalowują ją do żądanej wielkości. Inne karty używają bufora akumulacyjnego, tzw. T-bufora. Umieszczane są w nim dwie lub cztery identyczne ramki obrazu, każda z nich jest minimalnie przesuwana względem pozostałych po czym następuje ich zlanie w jeden obraz. Stosowanie tej metody powoduje jednak, że w odróżnieniu od antyaliasingu krawędziowego cały obraz na ekranie monitora pozbawiony jest schodków.
            </Fragment>
    }, {
        title: '18. Dithering',
        content:
            <Fragment>
                Proces polegający na symulacji niedostępnego w systemie koloru poprzez kompozycję kilku zbliżonych do niego barw z dostępnej palety. Może doprowadzić do obniżenia jakości wyświetlanego obrazu, efektu - ziarnistości.
            </Fragment>
    }, {
        title: '19. Charakterystyka OpenGL',
        content:
            <Fragment>
                Pierwszym etapem pracy z OpenGL jest inicjalizacja która odbywa się poprzez stworzenie kontekstu, który przechowuje wszystkie dane związane z wyświetlaniem aplikacji. Zarządzanie oknami systemu nie są częścią specyfikacji OpenGL, ze względu na to stosuje się inne zewnętrzne biblioteki które umożliwiają integracje. Zazwyczaj biblioteki umożliwiają pewien określony przebieg programu:<br/>
                1. Określenie właściwości okna renderingu (tytuł, właściwości kontekstu OpenGL)<br/>
                2. Inicjalizacja pętli zdarzeń w której realizowane będą takie zadanie jak:<br/>
                - obsługa kliknięcia myszką czy klawiszy klawiatury,<br/>
                - aktualizacja stanu renderingu,<br/>
                - aktualizacja rysunku,<br/>
                Podczas renderowania ramki, wyniki zostają zapisane w buforze znanym jako tylny, którego zawartość nie podlega wyświetlaniu. Odpowiednia funkcja powoduje przepisanie zawartości do bufora przedniego, którego zawartość jest wyświetlana w oknie renderingu,<br/>
            </Fragment>
    }, {
        title: '20. Modele barw (reprezentacja kolorów)',
        content:
            <Fragment>
                <b>CIE xyY</b> - powstała aby umożliwić opis współrzędnych trójchromatycznych CIE XYZ w przestrzeni 2D, z X, Y, Z przeliczone są współrzędne x, y, Y gdzie x i y określają chromatyczność a Y jasność.<br/>
                <b>Lab</b> - trójwymiarowy system koordynat. Oś a przedstawia udział barwy zielonej (ujemna) lub czerwonej(dodatnia). Oś b udział barwy niebieskiej(ujemna) lub żółtej(dodatnia). Oś L opisuje procentowo jasność barwy.<br/>
                <b>HSB</b> - przestrzeń barw złożona z 3 składowych H (hue - barwa), S (saturation - nasycenie), B (brightness - jasność). B opisywane jest na kole barw (może przyjąć wartość 0 - 360), pozostałe od 0 - 100.<br/>
                <b>RGB</b> - kolor opisany jest poprzez 3 wartośći R, G oraz B. Jest to model addytywny - suma wszystkich barw o najwyższej wartości daje kolor biały.<br/>
                <b>CMYK</b> - jest modelem subtraktywnym (suma barw daje kolor czarny, różnica daje biały)<br/>
                <b>YUV</b> -  model barw, w którym Y odpowiada za jasność obrazu (luminancję), a UV kodują barwę – są to dwa kanały chrominancji.<br/>
                <b>Przestrzeń kolorów Musella</b> - ma trzy wymiary: barwa (hue), nasycenie (chroma) i jasność (value). Munsell wyznaczył pięć barw głównych: czerwoną (R), żółtą (Y), zieloną (G), niebieską (B) i purpurową (P), oraz pięć barw pośrednich: czerwono-żółtą (RY), żółto-zieloną (YG), zielono-niebieską (GB), niebiesko-purpurową (BP) i purpurowo-czerwoną (PR).
            </Fragment>
    }, {
        title: '21. Oświetlenie',
        content:
            <Fragment>
                Rodzaje świateł:<br/>
                <b>- punktowe.</b><br/>
                <b>- rozproszone.</b><br/>
                <b>- ruchome.</b><br/><br/>
                <b>Algorytm Phonga</b> - model oświetlenia służący do modelowania odbić zwierciadlanych. Oparty na śledzeniu promieni. Na natężenie światła docierające do obserwatora składa się (światło odbite, światło rozproszone, światło otoczenia).<br/>
                <b>Algorytm Laberta</b> - model oświetlenia powierzchni matowych przez światło punktowe.
            </Fragment>
    }, {
        title: '22. Rzutowanie',
        content:
            <Fragment>
                <img src={img22} alt="22.png"/>
            </Fragment>
    }, {
        title: '23. Rachunek wektorowy',
        content:
            <Fragment>
                Wykorzystanie wektorów w grafice komputerowej:<br/>
                - określenie współrzędnych punktów orientacji w przestrzeni<br/>
                - opis zachowania światła (odbicia)<br/>
                - opis ruchu<br/>
                - pozycja obserwatora i inne.<br/>
                Wektor jest uporządkowanym zbiorem liczb. Operacje na wektorach (suma, iloczyn skalarny, iloczyn wektorowy).
            </Fragment>
    }, {
        title: '24. Rachunek macierzowy',
        content:
            <Fragment>
                Wykorzystanie macierzy w grafice<br/>
                - operacje na punktach<br/>
                - operacje na wektorach<br/>
                - przekształcenia geometryczne<br/>
                - rzutowanie<br/>
                - opis krzywych<br/>
                - opis powierzchni
            </Fragment>
    }, {
        title: '25. Przekształcenia geometryczne 2D i 3D',
        content:
            <Fragment>
                <img src={img25_1} alt="translacja" />
                <img src={img25_2} alt="skalowanie" />
                <img src={img25_3} alt="rotacja" />
            </Fragment>
    }, {
        title: '26. Stereoskopia',
        content:
            <Fragment>
                Technika obrazowania oddająca wrażenie normalnego widzenia stereoskopowego, to znaczy odwzorowująca nie tylko kształt i kolor obiektów, ale także ich wzajemne zależności przestrzenne, odległość od obserwatora i głębie sceny.<br/>
                Wymaga dostarczenia do mózgu dwóch obrazów, widzianych z perspektywy lewego i prawego oka. W tym celu wykonuje się parę zwykłych dwuwymiarowych obrazów (stereoparę), reprezentujących obiekt lub scenę z dwóch punktów widzenia, oddalonych tak jak oczy obserwatora. Obrazy składowe stereopary są bardzo podobne, ale różnią się nieco kątem widzenia obiektów i szczegółami wzajemnego przesłaniania się obiektów w scenie. To właśnie te drobne różnice niosą informację o trzecim wymiarze.<br/>
                Sposoby odwzorowania trzeciego wymiaru:<br/>
                - łączenie obrazu w stereopary i oglądanie przez dwie soczewki,<br/>
                - metoda anaglifowa - obrazy nałożone na siebie (zabarwione na czerwono i niebiesko), przy oglądaniu przez okulary o tak samo zabarwionych szkłach następuje separacja obrazów i pojawia się efekt przestrzenny.<br/>
                - metoda migawkowa - obrazy są wyświetlane przemiennie, oglądane przez okulary o szkłach ciekłokrystalicznych odłaniają na przemian lewe i prawe oko,<br/>
                - filtry polaryzacyjne - stosowane na ekranach, kierunki polaryzacji są ustawione prostopadle a widzowie oglądają obraz z filtrami dostosowanymi dla każdego oka.
            </Fragment>
    }, {
        title: '28. Krzywe parametryczne',
        content:
            <Fragment>
                <img src={img28} alt="28" />
            </Fragment>
    }, {
        title: '29. Silniki graficzne',
        content:
            <Fragment>
                Część kodu aplikacji odpowiedzialna za tworzenie grafiki 2D, 2,5D lub 3D, która następnie widoczna będzie na urządzeniu wyświetlającym obraz. Zawiera on elementy konieczne do wykonywania złożonych matematycznych obliczeń i przekształceń elementów grafiki.<br/>
                Silnik graficzny zajmuje się renderowaniem programowym bądź sprzętowym obrazu w czasie rzeczywistym na typowym ekranie komputera. W przypadku grafiki trójwymiarowej oznacza to, że każda klatka obrazu musi zostać wygenerowana na tyle szybko, aby możliwe było swobodne „poruszanie się” po trójwymiarowym świecie wirtualnym. Silniki graficzne do generowania obrazu trójwymiarowego są czasami nazywane silnikami 3D. Do przyśpieszenia i wykonywania bardziej złożonych obliczeń mogą wykorzystywać wsparcie sprzętowe specjalizowanych procesorów graficznych oraz obsługujących je bibliotek graficznych, takich jak DirectX, OpenGL czy Vulkan.
            </Fragment>
    }, {
        title: '30. Techniki generowania cieni',
        content:
            <Fragment>
                <b>Cieniowanie płaskie</b> - jest najprostszą metodą cieniowania. Polega ono na przyporządkowaniu całej powierzchni trójkąta jednego poziomu jasności. Dodatkowo uwzględnia barwy w przypadku gdy na scenie, rozstawione są kolorowe źródła światła. Poziom jasności i barwa są określane przez jeden z jego wierzchołków – zazwyczaj przez znajdujący się najbliżej obserwatora.<br/>
                <b>Cieniowanie Gourada</b> - zakłada, iż pojedynczy odcień wnętrza każdego trójkąta powstaje z interpolacji: (kolorów świateł, natężenia światła występujących w każdym z jego wierzchołków). Przy okazji uwzględniona zostaje w pewnym zakresie jasność sąsiednich wielokątów. W metodzie tej wnętrzu trójkąta przypisuje się nie jeden, ale kilka różnych poziomów jasności. Otrzymane są one przez interpolacje natężenia światła wzdłuż linii przechodzącej przez trójkąt i biegnącej od obserwatora do punktu w nieskończoności. Zakłada zwierciadlane odbicie światła.<br/>
                <b>Cieniowanie Phonga</b> - W metodzie tej kolor i natężenie światła przyporządkowywane są oddzielnie do każdego punktu sceny 3D - piksela obrazu. W metodzie tej interpolacji podlega wektor normalny do powierzchni na podstawie normalnych wektorów węzłowych. Jasność wewnątrz trójkąta może się zatem wyraźnie różnić od wartości węzłowych.
            </Fragment>
    }, {
        title: '31. Potok graficzny OpenGL z zastosowaniem shaderów',
        content:
            <Fragment>
                Tworzenie obrazu przy użyciu OpenGL zaczyna się od:<br/>
                a) Utworzenia zbioru wierzchołków (ang. vertex). Każdy z tych punktów jest przechowywany z pewnymi atrybutami i to do programisty należy decyzja, jakie cechy należy przechowywać. Powszechnie stosowane są atrybuty pozycji 3D we współrzędnych świata oraz współrzędne tekstury. Wierzchołki są danymi wejściowymi shadera wierzchołków - części oprogramowania sprzętowego karty graficznej. Shader wierzchołków to miejsce, gdzie odbywa się przekształcanie pozycji wierzchołków: z trójwymiarowego układu współrzędnych świata do znormalizowanego układu urządzenia NDC.<br/>
                b) Z tak przekształconych wierzchołków karta graficzna będzie tworzyć trójkąty, linie lub punkty w procesie zwanym shape assembly. Utworzone prymitywy stanowią podstawę złożonych kształtów. Do wyboru jest kilka dodatkowych trybów rysowania, takich jak: pasma trójkątów (ang. triangle strips ), i linii (ang.line strips )<br/>
                c) Kolejnym krokiem przetwarzania strumienia grafiki jest shader geometrii (ang. geometry shader ), który jest całkowicie opcjonalny i został wprowadzony do użytku dopiero niedawno. Wejściowe prymitywy z etapu shape assembly mogą być:<br/>
                - przekazywane dalej w dół strumienia grafiki bez zmian,<br/>
                - modyfikowane przed przekazaniem,<br/>
                - w całości odrzucone,<br/>
                - zastąpione innymi prymitywnymi.<br/>
                Po tym, jak ostateczna lista kształtów jest kompletna i dostosowana do współrzędnych ekranu, rasteryzator konwertuje widoczne elementy kształtów na zbiór fragmentów wielkości piksela.<br/>
                d) Atrybuty wierzchołków pochodzące z shadera wierzchołków lub shadera geometrii są interpolowane dla każdego fragmentu i przekazywane jako dane wejściowe do shadera fragmentów . Shader fragmentów przetwarza pojedynczo kazdy fragment wraz z jego interpolowanymi atrybutami i okresla jego ostateczny kolor poprzez:<br/>
                - pobranie próbki z tekstury zaczepionej w wierzchołkach lub<br/>
                - proste przekazanie koloru fragmentu<br/>
                e) Ostatecznie, efekt końcowy jest budowany ze wszystkich fragmentów kształtu przez:<br/>
                - mieszanie ich ze sobą,<br/>
                - testowanie bufora głębokości dla każdego fragmentu,<br/>
                - testowanie bufora szablonowego dla poszczególnych fragmentów.<br/>
            </Fragment>
    }, {
        title: '32. Vertex Shader',
        content:
            <Fragment>
                Jest programem karty graficznej, który przetwarza każdy wierzchołek i jego atrybuty w kolejności ich występowanie w wektorze wierzchołków. Jego obowiązkiem jest obliczenie końcowego położenia wierzchołków we współrzędnych urządzenia i przekazanie wymaganych  danych do shadera fragmentów. Dlatego właśnie tutaj zachodzą wszelkie przekształcenia obiektów w przestrzeni 3D i ich rzutowanie do 2D. Shader fragmentów wymaga atrybutów, takich jak kolor czy współrzędne tekstury, które zwykle są przekazywane przez shader wierzchołków z wejścia na wyjście bez żadnych zmian.
            </Fragment>
    }, {
        title: '33. Fragment Shader',
        content:
            <Fragment>
                Dane wyjściowe z modułu shadera wierzchołków podlegają interpolacji do wszystkich pikseli ekranu pokrytych przez prymityw w procesie zwanym rasteryzacja. Piksele te są nazywane fragmentami i są obiektami, na których działa shader fragmentów. Podobnie jak shader wierzchołków generuje on na wyjściu jeden obowiązkowy atrybut - końcowy kolor fragmentu. Do programisty należy utworzenie kodu generującego ten kolor na podstawie:<br/>
                · koloru wierzchołków,<br/>
                · współrzędnych tekstury<br/>
                · innych danych pochodzących z modułu shadera wierzchołków.
            </Fragment>
    }, {
        title: '34. Vertex Buffer Object',
        content:
            <Fragment>
                Bufor zawierający wektor ze współrzędnymi wszystkich wierzchołków, wraz z ich atrybutami. Vertex Buffer Object powstaje w momencie ładowania danych dotyczących wierzchołków do pamięci karty graficznej.
            </Fragment>
    }, {
        title: '35. Element Buffer Object',
        content:
            <Fragment>
                Bufor zawierający indeksy wierzchołków, który pozwala kontrolować kolejność ich wyświetlania, oraz pozwala na ponowne użycie raz zdefiniowanego wierzchołka. Tablica elementów jest wypełniona liczbami całkowitymi bez znaku, które odnoszą się do wierzchołków związanych z GL_ARRAY_BUFFER. Element Buffer Object powstaje, gdy elementy są ładowane do pamięci karty graficznej. Aby skorzystać z tego bufora, przy rysowaniu należy wykorzystać polecenie glDrawElements, zamiast glDraw Arrays.
            </Fragment>
    }
]