// PULSE Methodology Guide — Full content as typed constants

export interface MethodologySubsection {
  id: string;
  title: string;
  content: string[];
}

export interface MethodologySection {
  id: string;
  number: string;
  title: string;
  content: string[];
  subsections?: MethodologySubsection[];
  principles?: string[];
  phases?: { letter: string; title: string; color: string; description: string; activities: string; checkpoint: string }[];
}

export const methodologyMeta = {
  title: 'The PULSE Framework',
  subtitle: 'Problem \u00b7 Understand \u00b7 Landscape \u00b7 Solve \u00b7 Enable',
  tagline: 'The PATH to AI Readiness',
  label: 'Methodology Guide',
  author: 'Marty Koepke',
  org: 'Practical Informatics LLC',
  copyright: '\u00a9 2026 Practical Informatics LLC. All rights reserved.',
} as const;

export const methodologySections: MethodologySection[] = [
  {
    id: 'purpose',
    number: '1',
    title: 'Purpose of This Document',
    content: [
      'This document defines the PULSE Framework: its philosophy, structure, governance model, and guiding principles. It is the authoritative reference for anyone seeking to understand what PULSE is, why it exists, and how it approaches the work that determines whether technology implementations succeed or fail.',
      'PULSE was developed by Marty Koepke through nearly two decades of experience in healthcare informatics \u2014 spanning ICU critical care, multi-platform EHR implementation, enterprise governance, and AI-enabled technology adoption across one of the nation\u2019s largest health systems. Healthcare is where the methodology was forged, and it remains the most demanding proving ground for structured technology adoption. But the principles, phases, and governance model defined here apply to any organization in any industry facing technology decisions \u2014 particularly those involving AI.',
      'This is not a user guide. It does not walk through individual tools or templates. It defines the methodology and the thinking behind it. Practitioners seeking step-by-step implementation guidance should refer to the PULSE Toolkit, which is a separate deliverable designed for that purpose.',
    ],
  },
  {
    id: 'problem-pulse-solves',
    number: '2',
    title: 'The Problem PULSE Solves',
    content: [
      'The most expensive sentence in any organization is: \u201cWe need a new tool for that.\u201d',
      'Not because the tool is expensive (it might be), but because that sentence skips every question that should come first. It skips understanding what\u2019s actually happening in the workflow. It skips defining what \u201cbetter\u201d looks like in operational, measurable terms. It skips asking whether training, process change, or a configuration fix could solve the problem without new technology. And it skips the governance questions that determine whether a solution is safe, compliant, and sustainable.',
      'This is not a new problem. Organizations have been reaching for technology before doing the foundational work for decades. But two things have changed.',
      'First, AI has accelerated the pattern to a pace that leaves no room for course correction. When a traditional software implementation fails, the organization loses months and budget. When an AI implementation fails \u2014 when it\u2019s adopted without adequate workflow understanding, without clear success criteria, without governance \u2014 the consequences compound. Teams lose trust. Customers or patients may be affected. And the organization develops antibodies against the very innovation it was trying to embrace. The well-documented 95% failure rate in AI adoption across industries is not a technology problem. It is a process problem.',
      'Second, the noise has become deafening. Every vendor has an AI story. Every conference has an AI track. Every leadership team is under pressure to have an AI strategy. In the rush to not be left behind, organizations are skipping the structured work that determines whether any of it will actually be adopted, effective, and safe.',
      'PULSE exists because the foundational work \u2014 the work of understanding reality, defining the desired outcome, classifying the actual gaps, and planning for how humans adopt change \u2014 is being skipped at the exact moment it matters most.',
    ],
  },
  {
    id: 'why-different',
    number: '3',
    title: 'Why This Isn\u2019t Just Another Process Framework',
    content: [
      'The objection is fair: organizations already have methodologies. They have project management offices, change management frameworks, Lean, Six Sigma, Agile, and governance committees. So why does PULSE need to exist?',
      'Because knowing the steps and actually working them are two different things.',
    ],
    subsections: [
      {
        id: 'theory-practice-gap',
        title: '3.1 The Gap Between Theory and Practice',
        content: [
          'Most organizations will tell you they assess workflows before implementing technology. Most will tell you they involve stakeholders. Most will tell you they plan for adoption. And in most organizations, these things happen partially, informally, or not at all.',
          'Workflow assessment becomes a meeting where someone describes what they think happens rather than an observation of what actually happens. Stakeholder involvement becomes a steering committee that reviews a slide deck rather than the people who live in the workflow defining what \u201cbetter\u201d looks like. Adoption planning becomes a training session scheduled the week before go-live rather than a structured strategy designed months in advance.',
          'The steps are not new. The discipline of actually working them \u2014 rigorously, completely, with integrated tracking from beginning to end \u2014 is what most organizations lack. PULSE does not reinvent the steps. It creates the structure that makes them impossible to skip.',
        ],
      },
      {
        id: 'current-mess',
        title: '3.2 The Mess We\u2019re Already In',
        content: [
          'Before we add anything new, we need to be honest about where most organizations actually stand. Processes are undocumented or documented in artifacts that haven\u2019t been updated in years. Ownership of workflows is unclear. Pain points are well known to the people who live with them and invisible to the people who make decisions about them. Quick wins sit unaddressed because there\u2019s no mechanism to surface them. And the default response to any problem \u2014 operational, clinical, administrative \u2014 is to ask for a new tool.',
          'This is the environment into which AI is being introduced. Not a clean, well-mapped, well-governed landscape of processes. A messy, human, imperfect reality where people are doing their best with what they have, often without clear visibility into how the work actually flows.',
          'PULSE begins here. Not with the future state. Not with the technology. With an honest, unflinching look at what is actually happening today.',
        ],
      },
      {
        id: 'ai-acceleration',
        title: '3.3 The AI Acceleration Problem',
        content: [
          'Every technology adoption cycle carries risk. AI amplifies that risk in specific ways. Traditional software does what it\u2019s configured to do. AI makes recommendations, surfaces predictions, and in some cases takes autonomous action based on patterns in data. When AI is deployed without adequate understanding of the workflow it\u2019s entering, the consequences are not just inefficiency \u2014 they can be operational, ethical, regulatory, and in some industries, directly harmful to the people the organization serves.',
          'The intention of PULSE is not to slow organizations down. It is not to impede the journey toward technology excellence or to keep anyone from the front of the innovation line. It is to ensure that when an organization crosses that line, it does so with its eyes open: with workflows understood, gaps classified, governance in place, and a real plan for how the people doing the work will actually adopt the change.',
          'Speed without structure is how organizations end up implementing solutions that nobody uses, that create more work than they eliminate, or that introduce risks nobody anticipated. PULSE is the pause that prevents the restart.',
        ],
      },
      {
        id: 'what-makes-different',
        title: '3.4 What Makes PULSE Different',
        content: [
          'It treats every gap as a People, Process, or Platform decision \u2014 in that order. Most methodologies acknowledge that not everything requires technology. PULSE forces the classification at every phase, ensuring that training and process redesign are always evaluated before a technology solution is pursued. In practice, 60\u201380% of identified gaps can be addressed without new technology.',
          'It integrates governance into the methodology rather than running it alongside. Governance is not a separate committee that reviews decisions after they\u2019ve been made. It is embedded at every phase transition, scaled to the initiative\u2019s risk level, and documented as part of the same workflow \u2014 not in a separate system.',
          'It connects observation to action in a single, trackable thread. Most organizations generate findings in one place, write recommendations in another, track action items in a third, and lose the connective tissue between them. PULSE maintains a continuous thread: what was observed feeds what was analyzed, which feeds what was recommended, which feeds what was built, which feeds what is measured.',
          'It acknowledges that adoption is the actual product. A solution that is technically correct but not adopted is not a solution. PULSE treats training, communication, feedback mechanisms, and sustainment as core deliverables \u2014 not afterthoughts scheduled the week before go-live.',
        ],
      },
    ],
  },
  {
    id: 'principles',
    number: '4',
    title: 'Guiding Principles',
    content: [
      'Every decision within PULSE is governed by these principles:',
    ],
    principles: [
      'Truth before solutions. Observe what is actually happening \u2014 not what people believe, report, or wish is happening. Every implementation must begin with honest assessment of current state.',
      'Clarity before action. Define what \u201cgood\u201d looks like in operational, measurable terms before pursuing any solution. Vague desired outcomes produce vague results.',
      'People and Process before Platform. Categorize every identified gap as a People problem (training, skills, awareness), a Process problem (workflow design, handoffs, decision rules), or a Platform problem (technology capability). Address them in that order. Technology is prescribed only when People and Process solutions are insufficient.',
      'Governance is embedded, not bolted on. Risk assessment, compliance validation, ethical review, and stakeholder alignment are built into every phase transition \u2014 not performed after the fact by a separate committee.',
      'The right people in the room matter more than the right tool on the screen. Implementation success depends on identifying and engaging the stakeholders who own the problem, live the workflow, make the decisions, and sustain the outcome.',
      'Adoption is the product. A solution that isn\u2019t adopted is not a solution. Training, communication, change management, and sustainment planning are not optional follow-ups \u2014 they are core deliverables.',
      'Domain translation is the critical capability. Success requires someone who can sit between frontline teams, operations, leadership, and IT \u2014 translating needs, constraints, and decisions across all groups without belonging to any one of them.',
      'Governance scales to risk. A scheduling template update should not require the same governance rigor as a clinical AI deployment. The framework adapts \u2014 lightweight for low risk, comprehensive for high risk \u2014 without changing the methodology.',
    ],
  },
  {
    id: 'framework-structure',
    number: '5',
    title: 'Framework Structure',
    content: [
      'PULSE consists of five phases, each answering a single critical question. Governance checkpoints are embedded at every phase transition. No phase is optional, though the depth and rigor of each phase scales to the initiative\u2019s risk tier.',
    ],
    phases: [
      {
        letter: 'P',
        title: 'Problem',
        color: '#4A90E2',
        description: 'The trigger. Someone identifies a need, requests a tool, or escalates a pain point. Before committing resources, this phase captures the initial problem statement, identifies preliminary stakeholders, establishes scope boundaries, and records leadership\u2019s initial vision of the desired outcome. This is the framing that prevents the organization from solving the wrong problem.',
        activities: 'Problem statement drafting, initial stakeholder identification, scope definition, preliminary desired outcome capture, risk tier classification, AI initiative intake screening.',
        checkpoint: 'Should we pursue this? Is it strategically aligned? What is the risk tier? Is there executive sponsorship?',
      },
      {
        letter: 'U',
        title: 'Understand',
        color: '#4A90E2',
        description: 'The observation phase. Go to where the work happens. Map workflows step by step: who does what, in what system, how long it takes, where decisions occur, and where pain points exist. Document data flows. Identify quick wins. Capture findings. And critically, build the list of questions that leadership and decision-makers must answer in the next phase.',
        activities: 'Workflow observation and mapping, pain point identification and People/Process/Platform classification, data flow tracking, quick wins capture, findings documentation, Landscape Questions Log development.',
        checkpoint: 'Do we know enough to proceed? Are there data privacy or security risks we didn\u2019t anticipate? Are there bias or equity concerns the current process reveals?',
      },
      {
        letter: 'L',
        title: 'Landscape',
        color: '#4A90E2',
        description: 'The definition and alignment phase. Bring the Understand findings back to stakeholders and decision-makers. Facilitate definition of the desired state for each workflow step. Build measurable success criteria. Map gaps between current and desired state. Classify every gap as People, Process, or Platform. Validate root causes. Confirm stakeholder alignment. Produce prioritized recommendations.',
        activities: 'Desired state facilitation, success criteria definition, gap analysis with P/P/P classification, root cause assessment, stakeholder alignment validation, recommendation matrix development.',
        checkpoint: 'Is the desired state compliant and ethical? If AI is involved, has algorithmic transparency, explainability, and accountability been assessed? Do success criteria include governance metrics?',
      },
      {
        letter: 'S',
        title: 'Solve',
        color: '#E67E22',
        description: 'The recommendation-to-action bridge. Convert prioritized gaps into solution plans segmented by People, Process, and Platform. For each gap, document the proposed solution translated into language each stakeholder group can understand: clinical impact for clinical leaders, technical requirements for IT, workflow changes for operations, and frontline impact for end users. This is domain translation in its most tangible form.',
        activities: 'Solution design briefs, People/Process/Platform action planning, stakeholder communication translation, vendor evaluation (if applicable), solution governance planning.',
        checkpoint: 'Is the recommended solution governable? Can it be monitored, audited, and adjusted? If it\u2019s AI, can we explain it to a regulator? Who owns ongoing oversight?',
      },
      {
        letter: 'E',
        title: 'Enable',
        color: '#4A90E2',
        description: 'The adoption and sustainment phase. This is where most implementations fail \u2014 not because the solution was wrong, but because the organization didn\u2019t plan for how humans actually adopt change. This phase covers implementation readiness validation, training design, communication planning, feedback mechanisms, measurement, and long-term ownership transfer.',
        activities: 'Implementation readiness assessment, training and adoption planning, stakeholder communication execution, feedback loop design, 30/60/90-day measurement and monitoring, equity outcome tracking, ownership transfer, post-implementation governance review.',
        checkpoint: 'Is it working and is it safe? Are outcomes matching success criteria? Are there unintended consequences? Is AI behaving as expected across all populations served?',
      },
    ],
  },
  {
    id: 'ppp-thread',
    number: '6',
    title: 'The People/Process/Platform Thread',
    content: [
      'The P/P/P classification is the single analytical thread that runs through the entire PULSE methodology. It is not a tool used once \u2014 it is a lens applied continuously.',
      'In Understand: Every pain point is classified as a People, Process, or Platform issue at the point of observation. The P/P/P ratio becomes one of the most powerful insights shared with stakeholders.',
      'In Landscape: Every gap between current and desired state is classified. Root causes are traced to their P/P/P origin.',
      'In Solve: Action plans are segmented by category. People gaps get training plans. Process gaps get redesign plans. Platform gaps \u2014 and only Platform gaps \u2014 get technology solutions.',
      'In Enable: Sustainment strategies are tailored to each category. People solutions require ongoing competency validation. Process solutions require standard work documentation. Platform solutions require monitoring and maintenance.',
      'This classification is what prevents the most expensive reflex in organizations: assuming every problem requires a technology solution. By forcing categorization at every phase, PULSE ensures that training, process redesign, and configuration changes are always considered before new technology is pursued.',
      'At some point, we need people in the mix. People doing the work and technology supporting that work. Not the other way around. The last thing any organization needs is layer upon layer of technology in the face of its frontline workers as they\u2019re trying to do the job they were hired to do. P/P/P keeps the focus where it belongs: on the work, the people doing it, and the simplest effective intervention.',
    ],
  },
  {
    id: 'governance',
    number: '7',
    title: 'Governance Model',
    content: [
      'PULSE embeds governance as a wrapper around the methodology, not as a separate process. At each phase transition, a structured checkpoint ensures the organization is asking the right questions before proceeding.',
      'The governance model is proportional. A low-risk initiative receives lighter governance scrutiny than a high-risk initiative. Risk tier is established in the Problem phase and validated at each subsequent checkpoint.',
    ],
    subsections: [
      {
        id: 'risk-tiers',
        title: '7.1 Risk Tier Classification',
        content: [
          'Tier 1 \u2014 Standard: Operational improvements with no sensitive data exposure, no direct impact on customer- or patient-facing decisions, and no AI components. Governance checkpoints are self-assessed by the project team.',
          'Tier 2 \u2014 Elevated: Initiatives involving sensitive data, changes to customer- or patient-facing workflows, or integration with existing AI tools. Governance checkpoints require documented review by a designated governance lead.',
          'Tier 3 \u2014 Critical: Initiatives involving new AI implementation, decision support systems, algorithmic recommendations affecting people served by the organization, or cross-system data sharing. Governance checkpoints require formal review with documented sign-off from operational, compliance, privacy, and security stakeholders.',
        ],
      },
      {
        id: 'governance-scales',
        title: '7.3 Governance That Scales',
        content: [
          'Three variables determine the depth of governance any initiative requires: risk tier, AI involvement, and vendor involvement. A Tier 1 initiative with no AI and no vendor follows a streamlined path: one person, two to four weeks, self-assessed governance. A Tier 3 initiative with AI and vendor involvement follows the most comprehensive path: formal sign-offs at every checkpoint, full governance documentation, eight to twelve weeks.',
          'The methodology does not change. The rigor scales. This is how PULSE avoids the bottleneck problem that plagues most governance models \u2014 not by removing governance, but by right-sizing it to the risk.',
        ],
      },
    ],
  },
  {
    id: 'toolkit-philosophy',
    number: '8',
    title: 'Toolkit Philosophy',
    content: [
      'PULSE is supported by an integrated toolkit designed around three principles:',
      'Integration over isolation. Every tool\u2019s output feeds the next tool\u2019s input. Data captured during observation informs gap analysis. Gap analysis drives action planning. Action planning drives readiness assessment. The toolkit is a system, not a collection of standalone templates.',
      'Guidance alongside execution. For every structured data collection tool, there is a corresponding guide that explains what to capture, why it matters, what \u201cdone\u201d looks like, and what to do with the results. Practitioners should never be left staring at an empty template without context.',
      'Pathway-driven scope. Not every initiative requires every tool. An initiative\u2019s risk tier, AI involvement, and vendor involvement determine which tools apply. A straightforward operational improvement may use half the toolkit. A complex AI implementation uses all of it. The practitioner sees only what their initiative requires.',
      'The specific tools and templates that comprise the PULSE Toolkit are documented separately. This guide defines the principles that govern those tools \u2014 not the tools themselves.',
    ],
  },
  {
    id: 'domain-translator',
    number: '9',
    title: 'The Role of the Domain Translator',
    content: [
      'PULSE is a methodology. But a methodology without the right person facilitating it is just a set of templates. The critical human capability that makes PULSE work is domain translation.',
      'A domain translator is someone who sits between frontline teams, operations, leadership, and IT \u2014 translating needs, constraints, and decisions across all groups without belonging to any one of them. They are not a frontline practitioner, though they understand operational workflows. They are not IT, though they understand technology capabilities and constraints. They are not operations, though they understand how organizations actually function. They are not executives, though they understand strategic priorities and business cases.',
      'They are the person who can walk into a room where a frontline worker is frustrated, a technical analyst is confused, a director is impatient, and a compliance officer is concerned \u2014 and translate each person\u2019s needs into language the others can understand and act on.',
    ],
    subsections: [
      {
        id: 'translator-roles',
        title: '9.1 Roles the Domain Translator Plays',
        content: [
          'Across a PULSE engagement, the domain translator moves through multiple roles: Observer \u2014 Watching workflows without bias or assumptions. Translator \u2014 Converting frontline needs into technical requirements and technical constraints into operational language. Facilitator \u2014 Getting the right people in the room and guiding conversations to productive outcomes. Advocate \u2014 Representing the needs of end users who may not have a voice in decision-making. Liaison \u2014 Connecting stakeholder groups who don\u2019t normally communicate directly. Designer \u2014 Shaping solutions that work for the people who will actually use them. Change Manager \u2014 Ensuring solutions are adopted, not just deployed. Student \u2014 Continuously learning from every engagement, every workflow, every failure.',
        ],
      },
    ],
  },
  {
    id: 'application-context',
    number: '10',
    title: 'Application Context',
    content: [
      'PULSE is industry-agnostic. The five phases, the P/P/P classification, the embedded governance model, and the role of the domain translator apply wherever organizations are making technology decisions. The methodology has been applied and refined in healthcare \u2014 one of the most regulated, stakeholder-dense, and high-consequence environments for technology adoption \u2014 but the principles transfer directly to financial services, manufacturing, education, government, and any other sector grappling with AI readiness.',
    ],
    subsections: [
      {
        id: 'healthcare-context',
        title: '10.1 Where PULSE Was Forged: Healthcare',
        content: [
          'Healthcare is where PULSE was developed, and it remains the most demanding test of the methodology. The characteristics that make healthcare uniquely challenging also make it an ideal proving ground:',
          'Regulatory density: CMS, Joint Commission, ONC, HIPAA, state-specific regulations, and rapidly evolving AI-specific requirements create a compliance landscape that must be navigated at every phase.',
          'Human consequence: Unlike most industries, implementation failures in healthcare can directly harm patients. This elevates the stakes of every governance checkpoint and every bias screen.',
          'Multi-platform complexity: Large health systems operate multiple technology platforms across thousands of sites. Solutions must account for platform variation, regional differences, and workforce diversity.',
          'Workflow sensitivity: Changes that add even 30 seconds to a clinical encounter multiply across thousands of encounters per day.',
          'Stakeholder complexity: Physicians, nurses, medical assistants, front desk staff, IT, compliance, quality, administration, and patients all have legitimate but often competing needs.',
          'If PULSE works in this environment \u2014 and it does \u2014 it works anywhere.',
        ],
      },
      {
        id: 'ai-considerations',
        title: '10.2 AI-Specific Considerations',
        content: [
          'PULSE is technology-agnostic but AI-ready. When an initiative involves AI, the following additional considerations are activated regardless of industry:',
          'Algorithmic transparency: Can the organization explain how the AI reaches its recommendations? This is increasingly a regulatory requirement across healthcare, financial services, and any sector where AI-driven decisions affect people.',
          'Bias and equity monitoring: AI models can amplify existing disparities. Screening for bias must occur both during assessment and after implementation, whether the affected population is patients, customers, employees, or citizens.',
          'Model drift: AI performance degrades over time as data patterns change. Post-implementation monitoring must include drift detection.',
          'Human-in-the-loop requirements: Determining where human oversight is required is a governance decision, not a technical one.',
          'Vendor accountability: When AI is vendor-provided, governance must ensure appropriate contractual protections and ongoing accountability.',
        ],
      },
    ],
  },
];
