import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaBookOpen, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';
import { EducationContent } from '../types';
import Loading from '../components/common/Loading';

const EducationPage: NextPage = () => {
  const [articles, setArticles] = useState<EducationContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<EducationContent | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - in production, replace with API call
        const mockArticles: EducationContent[] = [
          {
            id: 'e001',
            title: 'Understanding Landslide Risk Factors',
            summary: 'Learn about the various factors that contribute to landslide risks in mountainous regions.',
            content: `
              <h2>Key Landslide Risk Factors</h2>
              <p>Landslides are complex geological phenomena influenced by multiple factors:</p>
              <ul>
                <li><strong>Slope Steepness</strong>: Steeper slopes are generally more susceptible to landslides, especially those exceeding 35 degrees.</li>
                <li><strong>Soil Composition</strong>: Clay-rich soils can become slippery when wet, while sandy soils may lack cohesion.</li>
                <li><strong>Water Saturation</strong>: Excessive rainfall and groundwater increases soil weight and reduces friction.</li>
                <li><strong>Vegetation Cover</strong>: Areas with sparse vegetation have reduced soil stabilization from root systems.</li>
                <li><strong>Human Activities</strong>: Construction, deforestation, and improper drainage can destabilize slopes.</li>
              </ul>
              <p>Understanding these factors helps communities assess local risk levels and take appropriate precautions.</p>
              <h2>Measuring Risk Factors</h2>
              <p>Modern monitoring systems like LEWS measure critical parameters including:</p>
              <ul>
                <li>Soil moisture content</li>
                <li>Ground movement (displacement)</li>
                <li>Rainfall intensity and duration</li>
                <li>Temperature fluctuations</li>
              </ul>
              <p>When these parameters exceed predefined thresholds, early warning systems can alert residents before a landslide occurs.</p>
            `,
            imageUrl: '/images/education/risk-factors.jpg',
            category: 'awareness',
            tags: ['risk', 'causes', 'geology']
          },
          {
            id: 'e002',
            title: 'Landslide Early Warning Signs',
            summary: 'Recognize the warning signs that could indicate an imminent landslide.',
            content: `
              <h2>Visual Warning Signs</h2>
              <p>Being able to recognize early warning signs of a potential landslide can save lives. Look for:</p>
              <ul>
                <li><strong>Ground Cracks</strong>: New cracks appearing in the ground, especially parallel to the slope</li>
                <li><strong>Tilting Trees</strong>: Trees leaning at unusual angles or with curved trunks (indicating slow soil movement)</li>
                <li><strong>Water Seepage</strong>: Unexpected water flows emerging from hillsides</li>
                <li><strong>Bulging Ground</strong>: Unusual bulges at the base of slopes</li>
                <li><strong>Infrastructure Damage</strong>: Cracks in buildings, walls, roads, or utilities near slopes</li>
              </ul>
              <h2>Sound and Sensation Warning Signs</h2>
              <p>Sometimes you can hear or feel warnings:</p>
              <ul>
                <li>Rumbling sounds from the hillside</li>
                <li>Sounds of cracking trees or breaking utility poles</li>
                <li>Unusual vibrations in the ground</li>
                <li>Doors or windows suddenly becoming difficult to open or close</li>
              </ul>
              <p>If you notice these warning signs, especially during or after heavy rainfall, evacuate immediately and notify authorities.</p>
            `,
            imageUrl: '/images/education/warning-signs.jpg',
            category: 'awareness',
            tags: ['warning signs', 'safety', 'observation']
          },
          {
            id: 'e003',
            title: 'Emergency Response During a Landslide Event',
            summary: 'Critical actions to take if you find yourself in an active landslide situation.',
            content: `
              <h2>Immediate Actions During a Landslide</h2>
              <p>If you are caught in or near an active landslide:</p>
              <ol>
                <li><strong>Move quickly away from the path</strong> of the landslide, ideally to higher ground or a pre-identified evacuation area.</li>
                <li><strong>Watch for falling rocks and debris</strong> which can travel surprisingly far from the main slide.</li>
                <li><strong>Avoid river valleys and low-lying areas</strong> as debris flows can travel far along these paths.</li>
                <li><strong>If escape is impossible</strong>, curl into a tight ball and protect your head until the slide passes.</li>
              </ol>
              <h2>After the Slide</h2>
              <p>Once the immediate danger has passed:</p>
              <ul>
                <li>Check yourself and others for injuries</li>
                <li>Help injured or trapped persons if it's safe to do so</li>
                <li>Listen to emergency broadcasts for information</li>
                <li>Report the landslide to authorities</li>
                <li>Stay away from the slide area - secondary slides are common</li>
                <li>Watch for flooding which may follow landslides</li>
                <li>Check for damaged utilities (gas, electric, water)</li>
              </ul>
              <p>Remember that landslides can destabilize buildings and infrastructure, creating additional hazards beyond the slide itself.</p>
            `,
            imageUrl: '/images/education/emergency-response.jpg',
            category: 'preparedness',
            tags: ['emergency', 'safety', 'response']
          },
          {
            id: 'e004',
            title: 'Landslide Prevention and Mitigation Techniques',
            summary: 'Learn about methods to prevent landslides or reduce their impacts on communities.',
            content: `
              <h2>Structural Mitigation Techniques</h2>
              <p>Engineering solutions can help stabilize vulnerable slopes:</p>
              <ul>
                <li><strong>Retaining Walls</strong>: Concrete, gabion, or reinforced earth structures that physically support unstable slopes</li>
                <li><strong>Proper Drainage Systems</strong>: Surface and subsurface drains to direct water away from slopes</li>
                <li><strong>Soil Reinforcement</strong>: Techniques like soil nailing, geotextiles, and biotechnical stabilization</li>
                <li><strong>Terracing</strong>: Creating stepped platforms that reduce the overall slope gradient</li>
                <li><strong>Protective Barriers</strong>: Debris flow barriers and catch fences to stop or redirect slides</li>
              </ul>
              <h2>Non-Structural Approaches</h2>
              <p>Policy and land management strategies include:</p>
              <ul>
                <li>Land-use planning and zoning regulations</li>
                <li>Preservation or restoration of natural vegetation</li>
                <li>Regular monitoring of high-risk areas</li>
                <li>Public education and awareness programs</li>
                <li>Early warning systems like LEWS</li>
              </ul>
              <p>Ideally, communities should adopt a combination of structural and non-structural approaches for comprehensive landslide risk reduction.</p>
            `,
            imageUrl: '/images/education/prevention.jpg',
            category: 'prevention',
            tags: ['mitigation', 'engineering', 'prevention']
          }
        ];

        setArticles(mockArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching education content:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(article => article.category === activeCategory);

  const openArticle = (article: EducationContent) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'awareness':
        return <FaBookOpen />;
      case 'prevention':
        return <FaShieldAlt />;
      case 'preparedness':
        return <FaExclamationTriangle />;
      default:
        return <FaBookOpen />;
    }
  };

  if (loading) return <Loading />;

  return (
    <div className='pt-28'>
      <Head>
        <title>Education Resources | LEWS</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Landslide Education</h1>
          <p className="text-gray-600 mt-2">Learn about landslide risks, prevention, and safety measures</p>
        </motion.div>

        {selectedArticle ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-card overflow-hidden mb-8"
          >
            {selectedArticle.imageUrl && (
              <div className="h-64 overflow-hidden">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedArticle.title}</h2>
                  <div className="flex space-x-2 mb-4">
                    {selectedArticle.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={closeArticle}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              ></div>

              <button
                onClick={closeArticle}
                className="mt-6 inline-flex items-center px-4 py-2 border border-primary-300 text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100"
              >
                Back to all articles
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="relative w-full md:w-auto mb-4 md:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search articles..."
                />
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap ${activeCategory === 'all'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  All Topics
                </button>
                <button
                  onClick={() => setActiveCategory('awareness')}
                  className={`px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap ${activeCategory === 'awareness'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <FaBookOpen className="inline mr-1" />
                  Awareness
                </button>
                <button
                  onClick={() => setActiveCategory('preparedness')}
                  className={`px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap ${activeCategory === 'preparedness'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <FaExclamationTriangle className="inline mr-1" />
                  Preparedness
                </button>
                <button
                  onClick={() => setActiveCategory('prevention')}
                  className={`px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap ${activeCategory === 'prevention'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <FaShieldAlt className="inline mr-1" />
                  Prevention
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => openArticle(article)}
                >
                  {article.imageUrl && (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className={`p-1.5 rounded-full mr-2 ${article.category === 'awareness'
                          ? 'bg-blue-100 text-blue-600'
                          : article.category === 'preparedness'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-green-100 text-green-600'
                        }`}>
                        {getCategoryIcon(article.category)}
                      </span>
                      <span className="text-xs font-medium text-gray-500 capitalize">
                        {article.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-2 text-gray-800">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.summary}</p>

                    <button
                      className="text-primary-600 text-sm font-medium hover:text-primary-800"
                    >
                      Read more →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EducationPage;
